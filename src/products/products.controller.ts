import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    UseGuards,
    Param,
    Patch,
    Req,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductServices } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiBasicAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProductDto } from './dto/update-product.dto';
import { CheckPermission } from '../utils/checkPermission';

@Controller('products')
@ApiTags('products')
export class ProductController {
    constructor(private readonly productServices: ProductServices) { }

    @Post('create-product')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('create_product'))
    @ApiOkResponse({ type: ProductDto })
    register(
        @Body() createProductDto: CreateProductDto,
    ): Promise<ProductDto> {
        return this.productServices.create(createProductDto);
    }

    @Get('get-all-products')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_product'))
    @ApiOkResponse({ type: [ProductDto] })
    findAll(@Req() request): Promise<ProductDto[]> {
        const request_branch_id = request.user.branch_id
        const role = request.user.role
        return this.productServices.findAll(request_branch_id, role);
    }

    @Patch('update-product')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_product'))
    @ApiOkResponse({ type: ProductDto })
    update(
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<ProductDto> {
        return this.productServices.update(updateProductDto.id, updateProductDto);
    }

    @Delete('delete-product/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_product'))
    @ApiOkResponse({ type: ProductDto })
    delete(@Param('id') id: number): Promise<ProductDto> {
        return this.productServices.delete(id);
    }
}
