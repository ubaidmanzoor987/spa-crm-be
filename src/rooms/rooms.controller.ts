import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    UseGuards,
    Param,
    Patch,
    Req,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomServices } from './rooms.service';
import { RoomDto } from './dto/room.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoomCreatedAndUpdatedResponseDto } from './dto/room-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CheckPermission } from '../utils/checkPermission';

@Controller('rooms')
@ApiTags('rooms')
export class RoomsController {
    constructor(private readonly roomServices: RoomServices) {}

    @Post('create-room')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('create_room'))
    @ApiOkResponse({ type: RoomCreatedAndUpdatedResponseDto })
    register(
        @Body() createRoomDto: CreateRoomDto,
    ): Promise<RoomCreatedAndUpdatedResponseDto> {
        return this.roomServices.create(createRoomDto);
    }

    @Get('get-all-rooms')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_room'))
    @ApiOkResponse({ type: [RoomDto] })
    findAll(@Req() request): Promise<RoomDto[]> {
        const request_branch_id = request.user.branch_id
        const role = request.user.role;
        return this.roomServices.findAll(request_branch_id, role);
    }

    @Patch('update-room')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_room'))
    @ApiOkResponse({ type: RoomDto })
    update(
        @Body() updateRoomDto: UpdateRoomDto,
    ): Promise<RoomCreatedAndUpdatedResponseDto> {
        return this.roomServices.update(updateRoomDto.id, updateRoomDto);
    }

    @Delete('delete-room/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_room'))
    @ApiOkResponse({ type: RoomDto })
    delete(@Param('id') id: number): Promise<RoomCreatedAndUpdatedResponseDto> {
        return this.roomServices.delete(id);
    }
}
