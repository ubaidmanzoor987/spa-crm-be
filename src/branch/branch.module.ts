import { Module } from '@nestjs/common';
import { DatabaseModule } from './../database/database.module';
import { BranchController } from './branch.controller';
import { branchProviders } from './branch.providers';
import { BranchService } from './branch.service';

@Module({
    imports: [DatabaseModule],
    controllers: [BranchController],
    providers: [BranchService, ...branchProviders],
    exports: [],
})
export class BranchModule {}
