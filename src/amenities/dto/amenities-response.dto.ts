import { ApiProperty } from '@nestjs/swagger';
import { Amenitie } from '../amenities.entity';

export class AmenitieCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    amenitie: Partial<Amenitie>;

    constructor(amenitie: Partial<Amenitie>) {
        const outputObj = {
            id: amenitie.id,
            name: amenitie.name,
            branch_id: amenitie.branch_id,
        };
        this.amenitie = outputObj;
    }
}
