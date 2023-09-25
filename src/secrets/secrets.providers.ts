import { Secrets } from './secrets.entity';

export const SecretProviders = [{ provide: 'secretsRepository', useValue: Secrets }];
