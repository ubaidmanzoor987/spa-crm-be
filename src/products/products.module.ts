import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductsProviders } from './products.providers';
import { DatabaseModule } from '../database/database.module';
import { ProductServices } from './products.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController],
    providers: [ProductServices, ...ProductsProviders],
    exports: [],
})
export class ProductsModule {}
