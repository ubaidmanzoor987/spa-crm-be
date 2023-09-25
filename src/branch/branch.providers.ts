import { Branch } from './branch.entity';

export const branchProviders = [
    { provide: 'BranchRepository', useValue: Branch },
];
