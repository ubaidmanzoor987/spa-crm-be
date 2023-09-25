import { Module } from '@nestjs/common';
import { AmenitieController } from './amenities.controller';
import { AmenitiesProviders } from './amenities.providers';
import { DatabaseModule } from '../database/database.module';
import { AmenitieServices } from './amenities.service';

@Module({
    imports: [DatabaseModule],
    controllers: [AmenitieController],
    providers: [AmenitieServices, ...AmenitiesProviders],
    exports: [],
})
export class AmenitiesModule {}
