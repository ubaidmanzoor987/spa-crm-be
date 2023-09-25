import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Leads } from './leads.entity';
import { LeadsCreatedAndUpdatedResponseDto } from './dto/leads-response.dto';
import { CreateLeadsDto } from './dto/create-leads.dto';
import { UpdateLeadsDto } from './dto/update-leads.dto';

@Injectable()
export class LeadServices {
    constructor(
        @Inject('leadsRepository')
        private readonly leadsRepository: typeof Leads
    ) { }


    async findAll() {
        const vis = await this.leadsRepository.findAll<Leads>({
        });

        return vis;
    }

    async create(createLeadsDto: CreateLeadsDto) {
        try {
            const lead = new Leads();
            lead.visit_phone_number = createLeadsDto.visit_phone_number;
            lead.branch_id = createLeadsDto.branch_id;
            lead.visit_id = createLeadsDto.visit_id;
            lead.visit_date = createLeadsDto.visit_date;
            lead.visit_time = createLeadsDto.visit_time;
            lead.social_platform = createLeadsDto.social_platform;
            lead.action_performed = createLeadsDto.action_performed;
            lead.secret_id = createLeadsDto.secret_id;

            const visitData = lead.save();
            return new LeadsCreatedAndUpdatedResponseDto(visitData);

        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateLeadsDto: UpdateLeadsDto) {
        const lead = await this.leadsRepository.findByPk<
            Leads
        >(id);
        if (!lead) {
            throw new HttpException(
                'Leads not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        try {
            lead.visit_phone_number = updateLeadsDto.visit_phone_number || lead.visit_phone_number;
            lead.branch_id = updateLeadsDto.branch_id || lead.branch_id;
            lead.visit_id = updateLeadsDto.visit_id || lead.visit_id;
            lead.visit_date = updateLeadsDto.visit_date || lead.visit_date;
            lead.visit_time = updateLeadsDto.visit_time || lead.visit_time;
            lead.social_platform = updateLeadsDto.social_platform || lead.social_platform;
            lead.action_performed = updateLeadsDto.action_performed || lead.action_performed;
            lead.secret_id = updateLeadsDto.secret_id || lead.secret_id;
            const data = lead.save();
            return new LeadsCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const service = await this.leadsRepository.destroy({
            where: {
                id,
            },
        });
        return service;
    }
}
