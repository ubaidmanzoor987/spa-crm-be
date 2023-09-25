import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    UseGuards,
    Put,
    Param,
    Req,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { BranchService } from './branch.service';
import { BranchDto } from './dto/branch.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { GetBranchResponseDto } from './dto/get-branch-response.dto';

@Controller('branch')
@ApiTags('branch')
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @Post('create-branch')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateBranchDto })
    register(
        @Body() createBranchDto: CreateBranchDto,
    ): Promise<CreateBranchDto> {
        return this.branchService.create(createBranchDto);
    }

    @Get('get-all-branches')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [BranchDto] })
    findAll( @Req() request): Promise<GetBranchResponseDto[]> {
        const request_branch_id = request.user.branch_id
        const role = request.user.role
        return this.branchService.findAll(request_branch_id,role);
    }

    @Get('get-branch/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateBranchDto })
    findOne(@Param('id') id: number): Promise<GetBranchResponseDto> {
        return this.branchService.findOne(id);
    }


    @Put('update-branch')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: BranchDto })
    update(@Body() updateBranchDto: UpdateBranchDto): Promise<BranchDto> {
        return this.branchService.update(updateBranchDto);
    }

    @Delete('delete-branch/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: BranchDto })
    delete(@Param('id') id: string): Promise<BranchDto> {
        return this.branchService.delete(id);
    }
}
