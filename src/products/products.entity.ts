import { Branch } from '../../src/branch/branch.entity';
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
    HasMany,
} from 'sequelize-typescript';
import { BookingProduct } from '../../src/bookingProduct/bookingProducts.entity';

@Table({
    tableName: 'products',
})
export class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    name: string;

    @Column
    price: number;

    @Column({type: 'text'})
    image: string;

    @Column
    description: string;

    @HasMany(() => BookingProduct)
    bookingProduct: BookingProduct[];

    @BelongsTo(() => Branch)
    branch: Branch;

    @ForeignKey(() => Branch)
    @Column({
        field: 'branch_id',
        type: DataType.INTEGER,
        onUpdate: 'CASCADE',
    })
    branch_id: number;

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
