import { ApiProperty } from '@nestjs/swagger';
import { RoleUser } from '../roleUser.entity';

export class RoleUserCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    RoleUser: Partial<RoleUser>;

    constructor(roleUser: Partial<RoleUser>) {
        const outputObj = {
            id: roleUser.id,
            role_name: roleUser.role_name,
            role_description: roleUser.role_description,
        };
        this.RoleUser = outputObj;
    }
}
