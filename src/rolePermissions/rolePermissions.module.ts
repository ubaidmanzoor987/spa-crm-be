import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RolePermissionController } from './rolePermissions.controller';
import { rolePermissionProviders } from './rolePermissions.providers';
import { RolePermissionServices } from './rolePermissions.service';


@Module({
    imports: [DatabaseModule],
    controllers: [RolePermissionController],
    providers: [RolePermissionServices, ...rolePermissionProviders],
    exports: [],
})
export class RolePermissionModule {}
