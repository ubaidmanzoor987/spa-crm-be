import { ApiProperty } from '@nestjs/swagger';
import { Room } from '../rooms.entity';

export class RoomCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    room: Partial<Room>;

    constructor(room: Partial<Room>) {
        const outputObj = {
            id: room.id,
            name: room.name,
            is_third_party: room.is_third_party,
            branch_id: room.branch_id,
        };
        this.room = outputObj;
    }
}
