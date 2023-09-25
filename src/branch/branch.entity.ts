import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
} from 'sequelize-typescript';
import { Room } from '../../src/rooms/rooms.entity';
import { Service } from '../../src/services/services.entity';
import { Booking } from '../../src/bookings/bookings.entity';
import { Product } from '../../src/products/products.entity';
import { User } from '../../src/users/user.entity';

@Table({
    tableName: 'branches',
})
export class Branch extends Model<Branch> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: string;

    @Column
    name: string;

    @Column
    address: string;

    @Column
    phone: string;

    @Column({type: 'text'})
    image: string;

    @Column
    default_currency: string;

    @HasMany(() => Service, {
        // onDelete: 'CASCADE',
    })
    service: Service;

    @HasMany(() => Room, {
        // onDelete: 'CASCADE',
    })
    room: Room;

    @HasMany(() => Booking, {
        // onDelete: 'CASCADE',
    })
    booking: Booking;

    @HasMany(() => Product, {
    })
    product: Product;

    @HasMany(() => User, {
    })
    user: User;

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
