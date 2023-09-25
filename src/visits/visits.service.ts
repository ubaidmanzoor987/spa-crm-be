import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Visits } from './visits.entity';
import { VisitsCreatedAndUpdatedResponseDto } from './dto/visits-response.dto';
import { CreateVisitsDto } from './dto/create-visits.dto';
import { UpdateVisitsDto } from './dto/update-visits.dto';
import { Op } from 'sequelize';
@Injectable()
export class VisitServices {
    constructor(
        @Inject('visitsRepository')
        private readonly visitsRepository: typeof Visits
    ) { }


    async findAll() {
        const vis = await this.visitsRepository.findAll<Visits>({
        });

        return vis;
    }

    async create(createVisitsDto: CreateVisitsDto) {
        try {
            const visit = new Visits();
            visit.visit_phone_number = createVisitsDto.visit_phone_number;
            visit.branch_id = createVisitsDto.branch_id;
            visit.visit_id = createVisitsDto.visit_id;
            visit.visit_date = createVisitsDto.visit_date;
            visit.visit_time = createVisitsDto.visit_time;
            visit.social_platform = createVisitsDto.social_platform;
            visit.action_performed = createVisitsDto.action_performed;
            visit.secret_id = createVisitsDto.secret_id;

            const visitData = await visit.save();
            return new VisitsCreatedAndUpdatedResponseDto(visitData);

        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateVisitsDto: UpdateVisitsDto) {
        // const visit = await this.visitsRepository.findByPk<
        //     Visits
        // >(id);
        // const visit = await this.visitsRepository.findAll<Visits>({
        // });
        // const visit = await this.visitsRepository.findOne <Visits>({where:{

        //     visit_date: >= 24/06/2023
        // }
        // });
        const current = new Date();
        const oneMinuteAgo = new Date(current.getTime() - 60000); // 1 minute ago
        const visit = await this.visitsRepository.findOne<Visits>({
            where: {
                // [Op.or]: [
                //     {
                //       visit_date: {
                //         [Op.lt]: current,
                //       },
                //     },
                //     {
                //       visit_date: {
                //         [Op.gte]: oneMinuteAgo,
                //       },
                //     },
                //   ],
                visit_date: {
                    [Op.gte]: oneMinuteAgo,
                },
                action_performed: updateVisitsDto.action_performed,
                branch_id: updateVisitsDto.branch_id,
            },
        });
        console.log(visit)
        if (!visit) {
            throw new HttpException(
                'visit not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        try {
            visit.visit_phone_number = updateVisitsDto.visit_phone_number || visit.visit_phone_number;
            visit.branch_id = updateVisitsDto.branch_id || visit.branch_id;
            visit.visit_id = updateVisitsDto.visit_id || visit.visit_id;
            visit.visit_date = updateVisitsDto.visit_date || visit.visit_date;
            visit.visit_time = updateVisitsDto.visit_time || visit.visit_time;
            visit.social_platform = updateVisitsDto.social_platform || visit.social_platform;
            visit.action_performed = updateVisitsDto.action_performed || visit.action_performed;
            visit.secret_id = updateVisitsDto.secret_id || visit.secret_id;
            const data = await visit.save();
            return new VisitsCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const service = await this.visitsRepository.destroy({
            where: {
                id,
            },
        });
        return service;
    }
}
