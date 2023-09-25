import { Module } from '@nestjs/common';
import { ServiceController } from './services.controller';
import { servicesProviders } from './services.providers';
import { DatabaseModule } from '../database/database.module';
import { ServiceServices } from './services.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ServiceController],
    providers: [ServiceServices, ...servicesProviders],
    exports: [],
})
export class ServiceModule {}
