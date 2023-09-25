import { Branch } from './../branch.entity';
import { ApiProperty } from '@nestjs/swagger';

export class BranchDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly phone: string;

    @ApiProperty()
    readonly image: string;

    @ApiProperty()
    readonly default_currency: string;


    constructor(branch: Branch) {
        this.name = branch.name;
        this.address = branch.address;
        this.phone = branch.phone;
        this.image = branch.image;
        this.default_currency = branch.default_currency;
    }
}
