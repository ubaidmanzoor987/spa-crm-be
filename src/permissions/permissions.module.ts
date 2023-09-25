import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { permissionProviders } from './permissions.providers';
import { DatabaseModule } from '../database/database.module';
import { PermissionServices } from './permissions.service';

@Module({
    imports: [DatabaseModule],
    controllers: [PermissionsController],
    providers: [PermissionServices, ...permissionProviders],
    exports: [PermissionServices],
})
export class PermissionModule {}
