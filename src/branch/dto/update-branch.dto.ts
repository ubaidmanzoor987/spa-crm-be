import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBranchDto {
    @ApiProperty()
    @IsString()
    readonly id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly address?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly phone?: string;

    
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly default_currency?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly image?: string;

}
