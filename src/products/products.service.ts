import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from './products.entity';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
// import { ProductCreatedAndUpdatedResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Branch } from '../../src/branch/branch.entity';

@Injectable()
export class ProductServices {
    constructor(
        @Inject('ProductRepository')
        private readonly ProductRepository: typeof Product,
    ) { }

    async findAll(request_branch_id: string, role: string) {
        const queryOptions = role === "superAdmin" ? {
            include: [
                {
                    model: Branch,
                    attributes: ['name'],
                    required: false,
                },
            ],
        } : { where: { branch_id: request_branch_id } };
        const products = await this.ProductRepository.findAll<Product>(queryOptions);
        return products.map(product => new ProductDto(product, product.branch?.name));
    }

    async create(createProductDto: CreateProductDto) {
        try {
            const product = new Product();
            product.name = createProductDto.name;
            product.price = createProductDto.price;
            product.image = createProductDto.image;
            product.branch_id = createProductDto.branch_id;
            product.description = createProductDto.description;

            const productData = await product.save();

            return new ProductDto(productData);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product: any = await this.ProductRepository.findByPk<Product>(id);
        if (!product) {
            throw new HttpException('product not found.', HttpStatus.NOT_FOUND);
        }

        try {
            product.name = updateProductDto.name || product.name;
            product.price = updateProductDto.price || product.price;
            product.image = updateProductDto.image || product.image;
            product.description =
                updateProductDto.description || product.description;
            product.branch_id = updateProductDto.branch_id || product.branch_id;
            const data = await product.save();
            return new ProductDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const product = await this.ProductRepository.findByPk<Product>(id);
        await product.destroy();
        return new ProductDto(product);
    }
}
