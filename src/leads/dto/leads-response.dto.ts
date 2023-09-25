import { ApiProperty } from '@nestjs/swagger';
import { Leads } from '../leads.entity';

export class LeadsCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    leads: Partial<Leads>;

    constructor(leads: Partial<Leads>) {
        const outputObj = {
            id: leads.id,
            visit_phone_number: leads.visit_phone_number,
            branch_id: leads.branch_id,
            visit_id: leads.visit_id,
            visit_date: leads.visit_date,
            visit_time: leads.visit_time,
            social_platform: leads.social_platform,
            action_performed: leads.action_performed,
            secret_id: leads.secret_id,
        };
        this.leads = outputObj;
    }
}
