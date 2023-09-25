import { Service } from './services.entity';

export const servicesProviders = [{ provide: 'ServicesRepository', useValue: Service }];
