import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Room } from './rooms.entity';
import { RoomDto } from './dto/room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomCreatedAndUpdatedResponseDto } from './dto/room-response.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsAmenities } from '../../src/roomsAmenities/roomsAmenities.entity';
import { Amenitie } from '../../src/amenities/amenities.entity';
import { Branch } from '../../src/branch/branch.entity';

@Injectable()
export class RoomServices {
    constructor(
        @Inject('RoomRepository')
        private readonly RoomRepository: typeof Room,
    ) { }

    async deleteAllRoomAmenities(room_id: number) {
        try {
            await RoomsAmenities.destroy({
                where: {
                    room_id: room_id,
                },
            });
        } catch (er) {
            console.log('er while deleteAllRoomAmenities', er);
        }
    }

    async createRoomAmenities(amenitiesId: Array<number>, roomId: any) {
        try {
            const promises = [];
            amenitiesId.forEach(aId => {
                const roomAmentie = new RoomsAmenities();
                roomAmentie.roomId = roomId;
                roomAmentie.amenitieId = aId;
                const respRoomAmenetie = roomAmentie.save();
                promises.push(respRoomAmenetie);
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        } catch (er) {
            console.log('er while createRoomAmenities', er);
        }
    }

    async findAll(request_branch_id: string, role: string) {
        const queryOptions = role === "superAdmin" ? {
            include: [
                {
                    model: RoomsAmenities,
                    attributes: ['id'],
                    required: false,
                    include: [
                        {
                            model: Amenitie,
                            attributes: ['name', 'id'],
                            required: false,
                        },
                    ],
                },
                {
                    model: Branch,
                    attributes: ['name'],
                    required: false,
                },
            ],
        } : {
            include: [
                {
                    model: RoomsAmenities,
                    attributes: ['id'],
                    required: false,
                    include: [
                        {
                            model: Amenitie,
                            attributes: ['name', 'id'],
                            required: false,
                        },
                    ],
                },
            ],
            where: { branch_id: request_branch_id },
        };
        const roomAmenties: any = await this.RoomRepository.findAll<Room>(queryOptions);
        return roomAmenties.map(
            (room: Room, index: number) =>
                new RoomDto(
                    room,
                    roomAmenties[index].roomAmenties.map(
                        (currentValue: any) => {
                            return currentValue.amenitie?.name;
                        },
                    ),
                    roomAmenties[index].roomAmenties.map(
                        (currentValue: any) => {
                            return currentValue.amenitie?.id;
                        },
                    ),
                    roomAmenties[index]?.branch?.name
                ),
        );
    }

    async create(createRoomDto: CreateRoomDto) {
        try {
            const room = new Room();
            room.name = createRoomDto.name;
            room.is_third_party =
                createRoomDto.is_third_party === 'true' ? 'true' : 'false';
            room.branch_id = createRoomDto.branch_id;

            const roomData = await room.save();
            if (createRoomDto.amenities.length > 0) {
                await this.createRoomAmenities(
                    createRoomDto.amenities,
                    roomData.id,
                );
            }

            return new RoomCreatedAndUpdatedResponseDto(roomData);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateRoomDto: UpdateRoomDto) {
        const room: any = await this.RoomRepository.findByPk<Room>(id, {
            include: [{ model: RoomsAmenities }],
        });
        if (!room) {
            throw new HttpException('room not found.', HttpStatus.NOT_FOUND);
        }

        try {
            room.name = updateRoomDto.name || room.name;
            room.is_third_party =
                (updateRoomDto.is_third_party === 'true' ? 'true' : 'false') ||
                (room.is_third_party === 'true' ? 'true' : 'false');
            room.branch_id = updateRoomDto.branch_id || room.branch_id;

            if (updateRoomDto.amenities.length > 0) {
                await this.deleteAllRoomAmenities(id);
                await this.createRoomAmenities(updateRoomDto.amenities, id);
            }
            const data = await room.save();
            return new RoomCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        await this.deleteAllRoomAmenities(id);
        const room = await this.RoomRepository.findByPk<Room>(id);
        await room.destroy();
        return new RoomCreatedAndUpdatedResponseDto(room);
    }
}
