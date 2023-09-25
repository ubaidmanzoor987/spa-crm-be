import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { secretsCreatedAndUpdatedResponseDto } from './dto/secrets-response.dto';
import { ConfigService } from '../shared/config/config.service';
import { ServicesAmenities } from '../../src/servicesAmenities/servicesAmenities.entity';
import { CreateSecretsDto } from './dto/create-secrets.dto';
import { UpdateSecretsDto } from './dto/update-secrets.dto';
import { Secrets } from './secrets.entity';

@Injectable()
export class SecretsServices {
    constructor(
        @Inject('secretsRepository')
        private readonly secretsRepository: typeof Secrets
    ) { }


    async findAll() {
        const sec = await this.secretsRepository.findAll<Secrets>({
        });

        return sec;
    }

    async create(createSecretsDto: CreateSecretsDto) {
        console.log({createSecretsDto})
        try {
            const secret = new Secrets();
            secret.secret_code = createSecretsDto.secret_code;
            secret.secret_key = createSecretsDto.secret_key;
            secret.campaign_email = createSecretsDto.campaign_email;
            console.log({ secret})
            const secretData = await secret.save();

            return new secretsCreatedAndUpdatedResponseDto(secretData);

        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateSecretsDto: UpdateSecretsDto) {
        const secret = await this.secretsRepository.findByPk<
            Secrets
        >(id);
        if (!secret) {
            throw new HttpException(
                'secret not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        try {
            secret.secret_code = updateSecretsDto.secret_code || secret.secret_code;
            secret.secret_key = updateSecretsDto.secret_key || secret.secret_key;
            secret.campaign_email = updateSecretsDto.campaign_email || secret.campaign_email;
            const data = await secret.save();
            return new secretsCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const service = await this.secretsRepository.destroy({
            where: {
                id,
            },
        });
        return service;
    }
}
