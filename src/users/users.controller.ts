import { UserLoginRequestDto } from './dto/user-login-request.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    Delete,
    Req,
    UseGuards,
    Put,
    Param,
} from '@nestjs/common';
import { CreateStaffDto, CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Roles } from '../shared/enum/roles';


@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    @ApiOkResponse({ type: UserLoginResponseDto })
    register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserLoginResponseDto> {
        return this.usersService.create(createUserDto);
    }

    @Post('add-staff')
    @ApiOkResponse({ type: UserResponseDto })
    addStaff(@Body() createUserDto: CreateStaffDto): Promise<UserResponseDto> {
        return this.usersService.addStaff(createUserDto);
    }

    @Get(':role')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [UserDto] })
    finduser(@Param('role') role: Roles, @Req() request): Promise<UserDto[]> {
        const request_branch_id = request.user.branch_id
        return this.usersService.finduser(role,request_branch_id);
    }

    @Post('login')
    @HttpCode(200)
    @ApiOkResponse({ type: UserLoginResponseDto })
    login(
        @Body() userLoginRequestDto: UserLoginRequestDto,
    ): Promise<UserLoginResponseDto> {
        return this.usersService.login(userLoginRequestDto);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [UserDto] })
    findAll(@Req() request): Promise<UserDto[]> {
        const request_branch_id = request.user.branch_id
        const role = request.user.role
        return this.usersService.findAll(request_branch_id,role);
    }

    @Put('update')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserResponseDto })
    update(
        @Body() updateUserDto: UpdateUserDto,
        @Req() request,
    ): Promise<UserResponseDto> {
        return this.usersService.update(request.user.id, updateUserDto);
    }

    @Delete('delete/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserResponseDto })
    delete(@Param('id') id: string): Promise<UserResponseDto> {
        return this.usersService.delete(id);
    }
}
