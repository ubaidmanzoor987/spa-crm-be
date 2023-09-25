import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly phone: string;

    @ApiProperty()
    readonly default_currency: string;

    @ApiProperty()
    readonly image: string;
}
