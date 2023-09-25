import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../services.entity';

export class ServiceCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    service: Partial<Service>;

    constructor(service: Partial<Service>) {
        const outputObj = {
            id: service.id,
            name: service.name,
            actual_price: service.actual_price,
            required_therapist: service.required_therapist,
            branch_id: service.branch_id,
        };
        this.service = outputObj;
    }
}
