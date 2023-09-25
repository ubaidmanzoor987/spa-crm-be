import { ApiProperty } from '@nestjs/swagger';
import { Visits } from '../visits.entity';

export class VisitsCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    visits: Partial<Visits>;

    constructor(visits: Partial<Visits>) {
        const outputObj = {
            id: visits.id,
            visit_phone_number: visits.visit_phone_number,
            branch_id: visits.branch_id,
            visit_id: visits.visit_id,
            visit_date: visits.visit_date,
            visit_time: visits.visit_time,
            social_platform: visits.social_platform,
            action_performed: visits.action_performed,
            secret_id: visits.secret_id,
        };
        this.visits = outputObj;
    }
}
