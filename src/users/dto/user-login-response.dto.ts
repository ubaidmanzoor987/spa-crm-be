import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserLoginResponseDto {
    @ApiProperty()
    token: string;

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
        this.token = token;
        this.user = outputObj;
    }
}
