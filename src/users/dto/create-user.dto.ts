import {
    IsString,
    IsEmail,
    IsEnum,
    IsOptional,
    MinLength,
} from 'class-validator';
import { Gender } from './../../shared/enum/gender';
import {  Roles } from './../../shared/enum/roles';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsString()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    readonly lastName: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Gender)
    readonly gender: Gender;

    @ApiProperty()
    @IsOptional()
    readonly dob: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Roles)
    readonly role: Roles;

    @ApiProperty()
    @IsOptional()
    readonly branch_id: string;

    @ApiProperty()
    @IsOptional()
    readonly phone: string;

    @ApiProperty()
    @IsOptional()
    readonly department: string;

    @ApiProperty()
    @IsOptional()
    readonly salary: string;

    @ApiProperty()
    @IsOptional()
    readonly presentAddress: string;

    @ApiProperty()
    @IsOptional()
    readonly permanentAddress: string;

    @ApiProperty()
    @IsOptional()
    readonly passport: string;

    @ApiProperty()
    @IsOptional()
    readonly idCard: string;

    @ApiProperty()
    @IsOptional()
    readonly commission_per_service: string;

    @ApiProperty()
    @IsOptional()
    readonly profile_picture: string;
}
export class CreateStaffDto {
    @ApiProperty()
    @IsOptional()
    readonly email: string;

    @ApiProperty()
    // @IsString()
    // @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsString()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    readonly lastName: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Gender)
    readonly gender: Gender;

    @ApiProperty()
    @IsOptional()
    readonly dob: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Roles)
    readonly role: Roles;

    @ApiProperty()
    @IsOptional()
    readonly branch_id: string;

    @ApiProperty()
    @IsOptional()
    readonly phone: string;

    @ApiProperty()
    @IsOptional()
    readonly department: string;

    @ApiProperty()
    @IsOptional()
    readonly salary: string;

    @ApiProperty()
    @IsOptional()
    readonly presentAddress: string;

    @ApiProperty()
    @IsOptional()
    readonly permanentAddress: string;

    @ApiProperty()
    @IsOptional()
    readonly passport: string;

    @ApiProperty()
    @IsOptional()
    readonly idCard: string;

    @ApiProperty()
    @IsOptional()
    readonly commission_per_service: string;

    @ApiProperty()
    @IsOptional()
    readonly profile_picture: string;
}
