import { ApiProperty } from '@nestjs/swagger';
import { Secrets } from '../secrets.entity';

export class secretsCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    secrets: Partial<Secrets>;

    constructor(secrets: Partial<Secrets>) {
        const outputObj = {
            id: secrets.id,
            secret_code: secrets.secret_code,
            secret_key: secrets.secret_key,
            campaign_email: secrets.campaign_email,
        };
        this.secrets = outputObj;
    }
}
