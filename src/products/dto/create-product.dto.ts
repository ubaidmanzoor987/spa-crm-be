import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @ApiProperty()
    // @IsNotEmpty()
    @IsString()
    readonly image: string;

    @ApiProperty()
    // @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly branch_id: number;
}
