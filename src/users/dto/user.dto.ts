import { User } from './../user.entity';
import { Gender } from './../../shared/enum/gender';
import { Roles } from './../../shared/enum/roles';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly first_name: string;

    @ApiProperty()
    readonly last_name: string;

    @ApiProperty()
    readonly gender: Gender;

    @ApiProperty()
    readonly dob: string;

    @ApiProperty()
    readonly role: Roles;

    @ApiProperty()
    readonly branch_id: string;

    @ApiProperty()
    readonly branch_name: string;

    @ApiProperty()
    readonly phone: string;

    @ApiProperty()
    readonly department: string;

    @ApiProperty()
    readonly salary: string;

    @ApiProperty()
    readonly present_address: string;

    @ApiProperty()
    readonly permanent_address: string;

    @ApiProperty()
    readonly passport: string;

    @ApiProperty()
    readonly id_card: string;

    @ApiProperty()
    readonly commission_per_service: string;

    @ApiProperty()
    readonly profile_picture: string;

    constructor(user: User, branch_name?:string) {
        this.id = user.id;
        this.email =
            user.email && user.email.includes('dummm') ? null : user.email;
        this.first_name = user.firstName;
        this.last_name = user.lastName;
        this.gender = user.gender;
        this.dob = user.dob;
        this.role = user.role;
        this.branch_id = user.branch_id;
        this.branch_name = branch_name;
        this.phone = user.phone;
        this.department = user.department;
        this.salary = user.salary;
        this.present_address = user.presentAddress;
        this.permanent_address = user.permanentAddress;
        this.passport = user.passport;
        this.id_card = user.idCard;
        this.commission_per_service = user.commission_per_service;
        this.profile_picture = user.profile_picture;
    }
}
