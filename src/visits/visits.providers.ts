import { Visits } from './visits.entity';

export const visitProviders = [{ provide: 'visitsRepository', useValue: Visits }];
