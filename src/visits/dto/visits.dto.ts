import { Visits } from '../visits.entity';
import { ApiProperty } from '@nestjs/swagger';

export class VisitDto {
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

    constructor(visits: Visits) {
        this.id = visits.id;
        this.visit_phone_number = visits.visit_phone_number;
        this.branch_id = visits.branch_id;
        this.visit_id = visits.visit_id;
        this.visit_date = visits.visit_date;
        this.visit_time = visits.visit_time;
        this.social_platform = visits.social_platform;
        this.action_performed = visits.action_performed;
        this.secret_id = visits.secret_id;
    }
}
