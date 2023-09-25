import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsProviders } from './rooms.providers';
import { DatabaseModule } from '../database/database.module';
import { RoomServices } from './rooms.service';

@Module({
    imports: [DatabaseModule],
    controllers: [RoomsController],
    providers: [RoomServices, ...RoomsProviders],
    exports: [],
})
export class RoomsModule {}
