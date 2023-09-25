import { Permission } from '../permissions.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly permission_name: string;

    constructor(permission: Permission) {
        this.id = permission.id;
        this.permission_name = permission.permission_name;
    }
}
