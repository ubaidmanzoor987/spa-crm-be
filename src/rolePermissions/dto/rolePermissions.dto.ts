
import { ApiProperty } from '@nestjs/swagger';
import { RolePermissions } from '../rolePermissions.entity';


export class RolePermissionDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly permission_id: number;

    @ApiProperty()
    readonly user_role_id: string;

    @ApiProperty()
    readonly is_allowed: string;

    constructor(rolePermissions: RolePermissions) {
        this.id = rolePermissions.id;
        this.permission_id = rolePermissions.permission_id;
        this.user_role_id = rolePermissions.user_role_id;
        this.is_allowed = rolePermissions.is_allowed;
    }
}
