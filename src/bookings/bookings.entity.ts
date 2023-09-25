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
    HasOne,
    AllowNull,
} from 'sequelize-typescript';
import { BookingProduct } from '../../src/bookingProduct/bookingProducts.entity';
import { BookingService } from '../../src/bookingServices/bookingServices.entity';
import { BookingTherapist } from '../../src/bookingTherapist/bookingTherapist.entity';
import { Branch } from '../../src/branch/branch.entity';
import { Customers } from '../../src/customers/customers.entity';
import { TaxiDriver } from '../../src/taxiDriver/taxiDriver.entity';
import { TherapistCommission } from '../../src/therapistCommission/therapistCommission.entity';
import { Tips } from '../../src/tips/tips.entity';
// import { RoomsAmenities } from '../../src/roomsAmenities/roomsAmenities.entity';

@Table({
    tableName: 'bookings',
})
export class Booking extends Model<Booking> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    date_time: Date;

    @Column
    is_driver_commission: string;

    @Column
    is_other_commission: string;

    @HasMany(() => BookingService)
    bookingService: BookingService[];

    @HasMany(() => BookingProduct)
    bookingProduct: BookingProduct[];

    @HasMany(() => BookingTherapist)
    bookingTherapist: BookingTherapist[];

    @HasOne(() => TaxiDriver)
    taxiDriver: TaxiDriver;

    @HasMany(() => Tips)
    tips: Tips[];

    @HasMany(() => TherapistCommission)
    therapistCommission: TherapistCommission[];

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

    @BelongsTo(() => Customers)
    customers: Customers;
    @ForeignKey(() => Customers)
    @AllowNull(false)
    @Column({
        field: 'customer_id',
        type: DataType.INTEGER,
    })
    customer_id: number;
    
    
    @Column
    discount: string;

    @Column
    card_payment: string;

    @Column
    cash_payment: string;

    @Column
    other_commission: string;

    @Column
    services_fee: number;

    @Column
    products_fee: number;

    @Column
    actual_services_fee: number;

    @Column
    actual_products_fee: number;

    @Column
    status: string;

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
