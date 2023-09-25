import { Product } from '../products.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly image: string;

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly branch_id: number;

    @ApiProperty()
    readonly branch_name: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly created_at: Date;

    constructor(product: Product, branch_name?:string) {
        this.id = product.id;
        this.name = product.name;
        this.image = product.image;
        this.price = product.price;
        this.branch_id = product.branch_id;
        this.branch_name = branch_name;
        this.description = product.description;
        this.created_at = product.createdAt;
    }
}
