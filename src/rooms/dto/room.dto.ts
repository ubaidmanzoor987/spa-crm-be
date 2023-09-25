import { Room } from '../rooms.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly is_third_party: string;

    @ApiProperty()
    readonly branch_id: number;

    @ApiProperty()
    readonly branch_name: string;

    @ApiProperty()
    readonly amenities: any[];

    @ApiProperty()
    readonly amenities_name: any[];

    @ApiProperty()
    readonly created_at: Date;

    constructor(room: Room, amenities?: any, amenities_id?: any,branch_name?:string) {
        this.id = room.id;
        this.name = room.name;
        this.is_third_party = room.is_third_party;
        this.branch_id = room.branch_id;
        this.branch_name = branch_name;
        this.amenities = amenities_id;
        this.amenities_name = amenities;
        this.created_at = room.createdAt;
    }
}
