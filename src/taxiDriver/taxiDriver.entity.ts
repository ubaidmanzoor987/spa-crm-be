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
import { Booking } from '../../src/bookings/bookings.entity';

@Table({
    tableName: 'taxidriver',
})
export class TaxiDriver extends Model<TaxiDriver> {
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
    driver_commission: string;

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
