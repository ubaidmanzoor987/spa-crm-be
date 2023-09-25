import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Service } from './services.entity';
import { ServiceDto } from './dto/service.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceCreatedAndUpdatedResponseDto } from './dto/service-response.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ConfigService } from '../shared/config/config.service';
import { ServicesAmenities } from '../../src/servicesAmenities/servicesAmenities.entity';
import { Amenitie } from '../../src/amenities/amenities.entity';
import { Branch } from '../../src/branch/branch.entity';

@Injectable()
export class ServiceServices {
    constructor(
        @Inject('ServicesRepository')
        private readonly serviceRepository: typeof Service,
        private readonly configService: ConfigService,
    ) { }

    async deleteAllServiceAmenities(room_id: number) {
        try {
            await ServicesAmenities.destroy({
                where: {
                    service_id: room_id,
                },
            });
        } catch (er) {
            console.log('er while deleteAllServiceAmenities', er);
        }
    }

    async createServicesAmenities(amenitiesId: Array<number>, serviceId: any) {
        try {
            const promises = [];

            amenitiesId.forEach(aId => {

                const serviceAmentie = new ServicesAmenities();
                serviceAmentie.serviceId = serviceId;
                serviceAmentie.amenitieId = aId;
                const respServiceAmenetie = serviceAmentie.save();
                promises.push(respServiceAmenetie);
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        } catch (er) {
            console.log('error while createServicesAmenities', er);
        }
    }

    async findAll(request_branch_id: string, role: string) {
        const queryOptions = role === "superAdmin" ? {
            include: [
                {
                    model: ServicesAmenities,
                    attributes: ['id'],
                    required: false,
                    include: [
                        {
                            model: Amenitie,
                            attributes: ['name', 'id'],
                            required: true,

                        },

                    ],
                },
                {
                    model: Branch,
                    attributes: ['name'],
                    required: true,
                }

            ],
        } : {
            include: [
                {
                    model: ServicesAmenities,
                    attributes: ['id'],
                    required: false,
                    include: [
                        {
                            model: Amenitie,
                            attributes: ['name', 'id'],
                            required: true,
                        },
                    ],
                },
                {
                    model: Branch,
                    attributes: ['name'],
                    required: true,
                }
            ],
            where: { branch_id: request_branch_id },
        }

        const servicesAmenities = await this.serviceRepository.findAll<Service>(
            queryOptions
        );

        return servicesAmenities.map(
            (service: Service, index: number) =>
                new ServiceDto(
                    service,
                    servicesAmenities[index].servicesAmenities.map(
                        (currentValue: any) => {
                            return currentValue.amenitie.name;
                        },

                    ),
                    servicesAmenities[index].servicesAmenities.map(
                        (currentValue: any) => {
                            return currentValue.amenitie.id;
                        },
                    ),
                    servicesAmenities[index].branch?.name
                ),
        );
    }

    async create(createServiceDto: CreateServiceDto) {
        try {
            const service = new Service();
            service.name = createServiceDto.name;
            service.actual_price = createServiceDto.actual_price;
            service.required_therapist = createServiceDto.required_therapist;
            service.branch_id = createServiceDto.branch_id;
            service.duration = createServiceDto.duration;

            const serviceData = await service.save();
            if (createServiceDto.amenitiesId.length > 0) {
                await this.createServicesAmenities(
                    createServiceDto.amenitiesId,
                    serviceData.id,
                );
            }
            // when registering then log user in automatically by returning a token
            return new ServiceCreatedAndUpdatedResponseDto(serviceData);
        } catch (err) {
            if (err.original.constraint === 'service_name_key') {
                throw new HttpException(
                    `Service with name '${err.errors[0].value}' already exists`,
                    HttpStatus.CONFLICT,
                );
            }

            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateServiceDto: UpdateServiceDto) {
        const service = await this.serviceRepository.findByPk<Service>(id);
        if (!service) {
            throw new HttpException('Service not found.', HttpStatus.NOT_FOUND);
        }

        try {
            service.name = updateServiceDto.name || service.name;
            service.actual_price =
                updateServiceDto.actual_price || service.actual_price;
            service.required_therapist =
                updateServiceDto.required_therapist ||
                service.required_therapist;
            service.branch_id = updateServiceDto.branch_id || service.branch_id;
            service.duration = updateServiceDto.duration || service.duration;
            if (updateServiceDto.amenitiesId.length > 0) {
                await this.deleteAllServiceAmenities(id);
                await this.createServicesAmenities(
                    updateServiceDto.amenitiesId,
                    id,
                );
            }
            const data = await service.save();
            return new ServiceCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        await this.deleteAllServiceAmenities(id);
        const service = await this.serviceRepository.findByPk(id);
        await service.destroy();
        return new ServiceCreatedAndUpdatedResponseDto(service);
    }
}
