import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from './../database/database.module';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';
import { ConfigService } from '../../src/shared/config/config.service';

@Module({
    imports: [DatabaseModule, ConfigService],
    controllers: [UsersController],
    providers: [UsersService, ...usersProviders, JwtStrategy],
    exports: [],
})
export class UsersModule {}
