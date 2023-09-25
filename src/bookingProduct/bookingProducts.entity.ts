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
} from 'sequelize-typescript';
import { Booking } from '../../src/bookings/bookings.entity';
import { Product } from '../../src/products/products.entity';

@Table({
    tableName: 'bookingproduct',
})
export class BookingProduct extends Model<BookingProduct> {
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

    @BelongsTo(() => Product)
    product: Product;
    @ForeignKey(() => Product)
    @AllowNull(true)
    @Column({
        field: 'product_id',
        type: DataType.INTEGER,
    })
    product_id: number;

    @Column
    product_price: number;

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
