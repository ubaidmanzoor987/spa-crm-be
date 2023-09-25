import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { visitProviders } from './visits.providers';
import { DatabaseModule } from '../database/database.module';
import { VisitServices } from './visits.service';

@Module({
    imports: [DatabaseModule],
    controllers: [VisitsController],
    providers: [VisitServices, ...visitProviders],
    exports: [VisitServices],
})
export class VisitsModule {}
