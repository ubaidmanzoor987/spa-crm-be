import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsProviders } from './bookings.providers';
import { DatabaseModule } from '../database/database.module';
import { BookingServices } from './bookings.service';

@Module({
    imports: [DatabaseModule],
    controllers: [BookingsController],
    providers: [BookingServices, ...BookingsProviders],
    exports: [],
})
export class BookingsModule {}
