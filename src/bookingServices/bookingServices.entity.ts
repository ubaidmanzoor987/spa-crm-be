import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BelongsTo,
    ForeignKey,
    AllowNull,
    DeletedAt,
    NotNull
} from 'sequelize-typescript';
import { Booking } from '../../src/bookings/bookings.entity';
import { Room } from '../../src/rooms/rooms.entity';
import { Service } from '../../src/services/services.entity';

@Table({
    tableName: 'bookingservices',
})
export class BookingService extends Model<BookingService> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @BelongsTo(() => Booking)
    booking: Booking;
    @ForeignKey(() => Booking)
    @AllowNull(false)
    @Column({
        field: 'booking_id',
        type: DataType.INTEGER,
        onDelete: 'NO ACTION',
    })
    booking_id: number;

    @BelongsTo(() => Service)
    service: Service;
    @ForeignKey(() => Service)
    @AllowNull(false)
    @Column({
        field: 'service_id',
        type: DataType.INTEGER,
        onDelete: 'NO ACTION',
    })
    service_id: string;

    @BelongsTo(() => Room)
    room: Room;
    @ForeignKey(() => Room)
    @AllowNull(false)
    @Column({
        field: 'room_id',
        type: DataType.INTEGER,
        onDelete: 'NO ACTION',
    })
    room_id: string;

    @Column
    selected_duration: number;

    @Column
    selected_price: number;

    @Column
    third_party_commission: string;

    @Column
    time_slot: string;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
