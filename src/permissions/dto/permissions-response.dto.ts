import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../permissions.entity';

export class PermissionCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    permission: Partial<Permission>;

    constructor(permission: Partial<Permission>) {
        const outputObj = {
            id: permission.id,
            permission_name: permission.permission_name,
        };
        this.permission = outputObj;
    }
}
