import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import { Amenitie } from '../../src/amenities/amenities.entity';
import { Room } from '../../src/rooms/rooms.entity';

@Table({
    tableName: 'roomsamenities',
})
export class RoomsAmenities extends Model<RoomsAmenities> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @BelongsTo(() => Room)
    room: Room;
    @ForeignKey(() => Room)
    @AllowNull(false)
    @Column({
        field: 'room_id',
        type: DataType.INTEGER,
    })
    roomId: number;

    @BelongsTo(() => Amenitie)
    amenitie: Amenitie;
    @ForeignKey(() => Amenitie)
    @AllowNull(false)
    @Column({
        field: 'amenitie_id',
        type: DataType.INTEGER,
    })
    amenitieId: number;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

}
