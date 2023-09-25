import { RoleUser } from "./roleUser.entity";

export const roleUserProviders = [{ provide: 'roleUserRepository', useValue: RoleUser }];
