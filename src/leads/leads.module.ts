import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { leadProviders } from './leads.providers';
import { DatabaseModule } from '../database/database.module';
import { LeadServices } from './leads.service';

@Module({
    imports: [DatabaseModule],
    controllers: [LeadsController],
    providers: [LeadServices, ...leadProviders],
    exports: [LeadServices],
})
export class LeadsModule {}
