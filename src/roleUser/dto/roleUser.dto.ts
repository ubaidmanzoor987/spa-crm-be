
import { ApiProperty } from '@nestjs/swagger';
import { RoleUser } from '../roleUser.entity';

export class RoleUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly role_name: string;

    @ApiProperty()
    readonly role_description: string;

    constructor(roleUser: RoleUser) {
        this.id = roleUser.id;
        this.role_name = roleUser.role_name;
        this.role_description = roleUser.role_description;
    }
}
