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
import { BookingTherapist } from '../../src/bookingTherapist/bookingTherapist.entity';
import { Branch } from '../../src/branch/branch.entity';
import { ServicesAmenities } from '../../src/servicesAmenities/servicesAmenities.entity';

@Table({
    tableName: 'services',
})
export class Service extends Model<Service> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    name: string;

    @HasMany(() => ServicesAmenities)
    servicesAmenities: ServicesAmenities[];

    @HasMany(() => BookingService)
    bookingService: BookingService[];

    @HasMany(() => BookingTherapist)
    bookingTherapist: BookingTherapist[];
    
    @Column
    actual_price: string;

    @Column
    required_therapist: number;

    @Column
    duration: string;

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
