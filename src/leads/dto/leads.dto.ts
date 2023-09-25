import { Leads } from '../leads.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LeadDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly visit_phone_number: string;
    @ApiProperty()
    readonly branch_id: number;
    @ApiProperty()
    readonly visit_id: string;
    @ApiProperty()
    readonly visit_date: string;
    @ApiProperty()
    readonly visit_time: string;
    @ApiProperty()
    readonly social_platform: string;
    @ApiProperty()
    readonly action_performed: string;
    @ApiProperty()
    readonly secret_id: number;

    constructor(leads: Leads) {
        this.id = leads.id;
        this.visit_phone_number = leads.visit_phone_number;
        this.branch_id = leads.branch_id;
        this.visit_id = leads.visit_id;
        this.visit_date = leads.visit_date;
        this.visit_time = leads.visit_time;
        this.social_platform = leads.social_platform;
        this.action_performed = leads.action_performed;
        this.secret_id = leads.secret_id;
    }
}
