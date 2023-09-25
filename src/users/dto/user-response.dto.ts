import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponseDto {
    @ApiProperty()
    user: Partial<User>;

    constructor(user: Partial<User>, token?: string) {
        const outputObj = {
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            gender: user.gender,
            dob: user.dob,
            role: user.role,
            branch_id: user.branch_id,
            phone: user.phone,
            department: user.department,
            salary: user.salary,
            present_address: user.presentAddress,
            permanent_address: user.permanentAddress,
            passport: user.passport,
            id_card: user.idCard,
            created_at: user.createdAt,
            commission_per_service: user.commission_per_service,
            profile_picture: user.profile_picture,
        };
        // const outputObj = {
        //     id: user.id,
        //     email: user.email,
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     gender: user.gender,
        //     dob: user.dob,
        //     role: user.role,
        //     branch_id: user.branch_id,
        //     phone: user.phone,
        //     department: user.department,
        //     salary: user.salary,
        //     presentAddress: user.presentAddress,
        //     permanentAddress: user.permanentAddress,
        //     passport: user.passport,
        //     idCard: user.idCard,
        //     createdAt: user.createdAt,
        //     commission_per_service: user.commission_per_service,
        //     profile_picture: user.profile_picture,
        // };
        this.user = outputObj;
    }
}
