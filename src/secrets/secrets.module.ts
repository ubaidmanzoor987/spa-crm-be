import { Module } from '@nestjs/common';
import { SecretsController } from './secrets.controller';
import { SecretProviders } from './secrets.providers';
import { DatabaseModule } from '../database/database.module';
import { SecretsServices } from './secrets.service';

@Module({
    imports: [DatabaseModule],
    controllers: [SecretsController],
    providers: [SecretsServices, ...SecretProviders],
    exports: [SecretsServices],
})
export class SecretsModule { }
