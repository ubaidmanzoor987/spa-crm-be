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
    HasMany,
} from 'sequelize-typescript';
import { Booking } from '../../src/bookings/bookings.entity';
import { BookingService } from '../../src/bookingServices/bookingServices.entity';
import { Service } from '../../src/services/services.entity';
import { User } from '../../src/users/user.entity';

@Table({
    tableName: 'tips',
})
export class Tips extends Model<Tips> {
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
    })
    booking_id: number;

    @Column
    tip_amount: number;

    @BelongsTo(() => User)
    user: User;
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        field: 'user_id',
        type: DataType.UUID,
    })
    user_id: string;

    @Column
    payment_method: string;

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
