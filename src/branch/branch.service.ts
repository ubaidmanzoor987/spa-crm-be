import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Branch } from './branch.entity';
import { BranchDto } from './dto/branch.dto';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { GetBranchResponseDto } from './dto/get-branch-response.dto';

@Injectable()
export class BranchService {
    constructor(
        @Inject('BranchRepository')
        private readonly BranchRepository: typeof Branch,
    ) {}

    async findAll(request_branch_id:string, role:string): Promise<GetBranchResponseDto[]> {
        const queryOptions = role === "superAdmin" ? {} : { where: { id: request_branch_id } };
        const branches = await this.BranchRepository.findAll<Branch>(queryOptions);
        return branches.map(branch => new GetBranchResponseDto(branch));
    }

    async create(createBranchDto: CreateBranchDto): Promise<CreateBranchDto> {
        try {
            const branch = new Branch();
            branch.name = createBranchDto.name;
            branch.address = createBranchDto.address;
            branch.phone = createBranchDto.phone;
            branch.image = createBranchDto.image;
            branch.default_currency = createBranchDto.default_currency;
            const branchData = await branch.save();
            return new BranchDto(branchData);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: number) {
        try {
            const branch: any = await this.BranchRepository.findByPk<Branch>(
                id,
            );

            if (!branch) {
                throw new HttpException(
                    'branch not found.',
                    HttpStatus.NOT_FOUND,
                );
            }
            return new GetBranchResponseDto(branch);
        } catch (error) {
            console.log('error from catch', { error });
            throw new Error(error);
        }
    }

    async update(updateBranchDto: UpdateBranchDto): Promise<CreateBranchDto> {
        const branch = await this.BranchRepository.findByPk<Branch>(
            updateBranchDto.id,
        );
        if (!branch) {
            throw new HttpException('branch not found.', HttpStatus.NOT_FOUND);
        }
        branch.name = updateBranchDto.name || branch.name;
        branch.address = updateBranchDto.address || branch.address;
        branch.phone = updateBranchDto.phone || branch.phone;
        branch.image = updateBranchDto.image || branch.image;
        branch.default_currency = updateBranchDto.default_currency || branch.default_currency;

        try {
            const data = await branch.save();
            return new BranchDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<CreateBranchDto> {
        const branch = await this.BranchRepository.findByPk<Branch>(id);
        if (!branch) {
            throw new HttpException('branch not found', HttpStatus.NOT_FOUND);
        }
        await branch.destroy();
        return new BranchDto(branch);
    }
}
