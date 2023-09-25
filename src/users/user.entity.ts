
import {
    Table,
    Column,
    Model,
    Unique,
    IsEmail,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
    ForeignKey,
    AllowNull,
    BelongsTo,
} from 'sequelize-typescript';
import { BookingTherapist } from '../../src/bookingTherapist/bookingTherapist.entity';
import { TherapistCommission } from '../../src/therapistCommission/therapistCommission.entity';
import { Tips } from '../../src/tips/tips.entity';
import { RoleUser } from '../../src/roleUser/roleUser.entity'
import { Gender } from './../shared/enum/gender';
import { Roles } from './../shared/enum/roles';
import { Branch } from './../branch/branch.entity';

@Table({
    tableName: 'users',
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    // @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column({ field: 'first_name' })
    firstName: string;

    @Column({ field: 'last_name' })
    lastName: string;

    @Column({ type: DataType.ENUM(Gender.female, Gender.male) })
    gender: Gender;

    @Column(DataType.DATEONLY)
    dob: string;

    @Column
    role: Roles;

    @BelongsTo(() => Branch)
    branch: Branch;

    @ForeignKey(() => Branch)
    @Column({
        field: 'branch_id',
        type: DataType.INTEGER,
        onUpdate: 'CASCADE',
    })
    branch_id: string;

    @Column
    phone: string;

    @Column
    department: string;

    @Column
    salary: string;

    @Column
    presentAddress: string;

    @Column
    permanentAddress: string;

    @Column
    passport: string;

    @Column
    idCard: string;

    @Column
    commission_per_service: string;

    @Column({type: 'text'})
    profile_picture: string;

    @HasMany(() => BookingTherapist)
    bookingTherapist: BookingTherapist[];

    // @HasMany(() => RolePermissions)
    // rolePermissions: RolePermissions[];

    // @BelongsTo(() => RoleUser)
    // roleUser: RoleUser;
    // @ForeignKey(() => RoleUser)
    // @Column({
    //     field: 'role_id',
    //     type: DataType.UUID,
    // })
    // role_id: string;

    @HasMany(() => Tips)
    tips: Tips[];

    @HasMany(() => TherapistCommission)
    therapistCommission: TherapistCommission[];

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

export class UserRes extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column({ field: 'first_name' })
    firstName: string;

    @Column({ field: 'last_name' })
    lastName: string;

    @Column({ type: DataType.ENUM(Gender.female, Gender.male) })
    gender: Gender;

    @Column(DataType.DATEONLY)
    dob: string;

    @Column
    role: Roles;

    @BelongsTo(() => Branch)
    branch: Branch;

    @ForeignKey(() => Branch)
    @Column({
        field: 'branch_id',
        type: DataType.INTEGER,
        onUpdate: 'CASCADE',
    })
    branch_id: string;


    @Column
    phone: string;

    @Column
    department: string;

    @Column
    salary: string;

    @Column
    presentAddress: string;

    @Column
    permanentAddress: string;

    @Column
    passport: string;

    @Column
    idCard: string;

    @Column
    commission_per_service: string;

    @Column
    profile_picture: string;

    @HasMany(() => BookingTherapist)
    bookingTherapist: BookingTherapist[];

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