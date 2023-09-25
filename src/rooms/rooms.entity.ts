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
import { BookingService } from '../../src/bookingServices/bookingServices.entity';
import { Branch } from '../../src/branch/branch.entity';
import { RoomsAmenities } from '../../src/roomsAmenities/roomsAmenities.entity';

@Table({
    tableName: 'rooms',
})
export class Room extends Model<Room> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    name: string;

    @Column
    is_third_party: string;

    @HasMany(() => RoomsAmenities)
    roomAmenties: RoomsAmenities[];

    @HasMany(() => BookingService)
    bookingService: BookingService[];
    
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
