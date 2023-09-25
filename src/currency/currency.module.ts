import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { currencyProviders } from './currency.providers';
import { DatabaseModule } from './../database/database.module';
import { CurrencyService } from './currency.service';
// import { RoleUserModule } from './../roleUser/roleUser.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CurrencyController],
    providers: [CurrencyService, ...currencyProviders],
    exports: [],
})
export class CurrencyModule {}
