import { Secrets } from '../secrets.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SecretsDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly secret_code: string;
    @ApiProperty()
    readonly secret_key: string;
    @ApiProperty()
    readonly campaign_email: string;

    constructor(secrets: Secrets) {
        this.id = secrets.id;
        this.secret_code = secrets.secret_code;
        this.secret_key = secrets.secret_key;
        this.campaign_email = secrets.campaign_email;
    }
}
