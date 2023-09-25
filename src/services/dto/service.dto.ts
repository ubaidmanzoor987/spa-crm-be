import { Service } from '../services.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly actual_price: string;

    @ApiProperty()
    readonly branch_id: number;

    @ApiProperty()
    readonly branch_name: string;

    @ApiProperty()
    readonly service_duration_price: string;

    @ApiProperty()
    readonly amenities: any[];

    @ApiProperty()
    readonly amenitiesId: any[];

    @ApiProperty()
    readonly required_therapist: number;

    constructor(service: Service, amenities?: any, amenitiesIs?: any, branch_name?: any) {
        this.id = service.id;
        this.name = service.name;
        this.actual_price = service.actual_price;
        this.required_therapist = service.required_therapist;
        this.branch_id = service.branch_id;
        this.branch_name = branch_name;
        this.service_duration_price = JSON.parse(service.duration);
        this.amenities = amenities;
        this.amenitiesId = amenitiesIs;
    }
}
