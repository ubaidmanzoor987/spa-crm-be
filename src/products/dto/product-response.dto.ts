import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../products.entity';

export class ProductCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    product: Partial<Product>;

    constructor(product: Partial<Product>) {
        const outputObj = {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
        };
        this.product = outputObj;
    }
}
