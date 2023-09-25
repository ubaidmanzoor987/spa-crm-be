import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RoleUserController } from './roleUser.controller';
import { roleUserProviders } from './roleUser.providers';
import { RoleUserServices } from './roleUser.service';


@Module({
    imports: [DatabaseModule],
    controllers: [RoleUserController],
    providers: [RoleUserServices, ...roleUserProviders],
    exports: [],
})
export class RoleUserModule {}
