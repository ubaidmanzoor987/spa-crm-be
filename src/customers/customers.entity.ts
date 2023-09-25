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
    HasMany,
} from 'sequelize-typescript';
import { Booking } from '../../src/bookings/bookings.entity';
import { Branch } from '../../src/branch/branch.entity';

@Table({
    tableName: 'customers',
})
export class Customers extends Model<Customers> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    name: string;

    @Column
    email: string;

    @Column
    phone: string;

    @Column
    dob: string;

    @Column
    street_address: string;

    @Column
    city: string;

    @Column
    country: string;

    @Column
    postal_code: string;

    @HasMany(() => Booking)
    booking: Booking[];

    @BelongsTo(() => Branch)
    branch: Branch;

    @ForeignKey(() => Branch)
    @Column({
        field: 'branch_id',
        type: DataType.INTEGER,
        // onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    branch_id: number;

    @Column
    state_name: string;

    @Column
    remarks: string;

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
