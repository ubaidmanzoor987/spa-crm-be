import { Amenitie } from '../amenities.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AmenitieDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly branch_id: number;

    @ApiProperty()
    readonly branch_name: string;

    @ApiProperty()
    readonly created_at: Date;

    constructor(amenitie: Amenitie, branch_name?: string) {
        this.id = amenitie.id;
        this.name = amenitie.name;
        this.branch_id = amenitie.branch_id;
        this.branch_name = branch_name;
        this.created_at = amenitie.createdAt;
    }
}
