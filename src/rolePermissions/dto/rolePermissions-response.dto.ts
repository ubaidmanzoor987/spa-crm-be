import { ApiProperty } from '@nestjs/swagger';
import { RolePermissions } from '../rolePermissions.entity';


export class RolePermissionCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    RolePermission: Partial<RolePermissions>;

    constructor(rolePermissions: Partial<RolePermissions>) {
        const outputObj = {
            id: rolePermissions.id,
            permission_id: rolePermissions.permission_id,
            user_role_id: rolePermissions.user_role_id,
            is_allowed: rolePermissions.is_allowed,
        };
        this.RolePermission = outputObj;
    }
}
