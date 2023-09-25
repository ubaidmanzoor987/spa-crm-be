import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Amenitie } from './amenities.entity';
import { AmenitieDto } from './dto/amenities.dto';
import { CreateAmenitieDto } from './dto/create-amenities.dto';
import { AmenitieCreatedAndUpdatedResponseDto } from './dto/amenities-response.dto';
import { UpdateAmenitieDto } from './dto/update-amenities.dto';
import { Branch } from '../../src/branch/branch.entity';

@Injectable()
export class AmenitieServices {
    constructor(
        @Inject('AmenitieRepository')
        private readonly AmenitieRepository: typeof Amenitie,
    ) { }

    async findAll(request_branch_id: string, role: string) {
        const queryOptions = role === "superAdmin" ? {
            include: [
                {
                    model: Branch,
                    attributes: ['name'],
                    required: false,
                },
            ],
        } : { where: { branch_id: request_branch_id } };
        const users = await this.AmenitieRepository.findAll<Amenitie>(queryOptions);
        return users.map(user => new AmenitieDto(user, user.branch?.name));
    }

    async create(createAmenitieDto: CreateAmenitieDto) {
        try {
            const amenitie = new Amenitie();
            amenitie.name = createAmenitieDto.name;
            amenitie.branch_id = createAmenitieDto.branch_id;
            const AmenitieData = await amenitie.save();
            return new AmenitieCreatedAndUpdatedResponseDto(AmenitieData);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateAmenitieDto: UpdateAmenitieDto) {
        const Amenitie = await this.AmenitieRepository.findByPk<Amenitie>(id);
        if (!Amenitie) {
            throw new HttpException(
                'Amenitie not found.',
                HttpStatus.NOT_FOUND,
            );
        }
        Amenitie.name = updateAmenitieDto.name || Amenitie.name;
        Amenitie.branch_id = updateAmenitieDto.branch_id || Amenitie.branch_id;

        try {
            const data = await Amenitie.save();
            return new AmenitieCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const amen = await this.AmenitieRepository.findByPk<Amenitie>(id);
        await amen.destroy();
        return new AmenitieCreatedAndUpdatedResponseDto(amen);
    }
}
