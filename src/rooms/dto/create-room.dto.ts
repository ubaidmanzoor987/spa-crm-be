import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly is_third_party: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    readonly amenities: Array<number>;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly branch_id: number;

}
