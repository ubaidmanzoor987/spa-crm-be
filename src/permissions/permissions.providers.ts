import { Permission } from './permissions.entity';

export const permissionProviders = [{ provide: 'permissionsRepository', useValue: Permission }];
