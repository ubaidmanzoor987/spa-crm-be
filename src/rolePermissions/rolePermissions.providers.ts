import { RolePermissions } from "./rolePermissions.entity";


export const rolePermissionProviders = [{ provide: 'rolePermissionsRepository', useValue: RolePermissions }];
