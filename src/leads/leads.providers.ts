import { Leads } from './leads.entity';

export const leadProviders = [{ provide: 'leadsRepository', useValue: Leads }];
