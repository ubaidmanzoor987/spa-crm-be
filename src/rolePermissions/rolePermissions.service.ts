import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-rolePermissions.dto';
import { RolePermissionCreatedAndUpdatedResponseDto } from './dto/rolePermissions-response.dto';
import { UpdateRolePermissionDto } from './dto/update-rolePermissions.dto';
import { RolePermissions } from './rolePermissions.entity';




@Injectable()
export class RolePermissionServices {
    constructor(
        @Inject('rolePermissionsRepository')
        private readonly rolePermissionsRepository: typeof RolePermissions
    ) { }



    async findAll() {
        const per = await this.rolePermissionsRepository.findAll<RolePermissions>();
        return per;
    }
    // async findRolePermission() {
    //     const per = await this.rolePermissionsRepository.findAll<RolePermissions>();
    //     return new RolePermissionCreatedAndUpdatedResponseDto( per);
    // }
    
    async create(createRolePermissionDto: CreateRolePermissionDto) {
        try {
            const rolePer = new RolePermissions();
            rolePer.permission_id = Number(createRolePermissionDto.permission_id);
            rolePer.user_role_id = createRolePermissionDto.role_id;
            rolePer.is_allowed = createRolePermissionDto.is_allowed;
            const rolePerData =  await rolePer.save();
            return new RolePermissionCreatedAndUpdatedResponseDto(rolePerData);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
        const rolePermissions = await this.rolePermissionsRepository.findByPk<
            RolePermissions
        >(id);
        if (!rolePermissions) {
            throw new HttpException(
                'rolePermissions not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        try {
            rolePermissions.permission_id = Number(updateRolePermissionDto.permission_id) || rolePermissions.permission_id;
            rolePermissions.user_role_id = updateRolePermissionDto.role_id || rolePermissions.user_role_id;
            rolePermissions.is_allowed = updateRolePermissionDto.is_allowed || rolePermissions.is_allowed;
            const data = await rolePermissions.save();
            return new RolePermissionCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        // await this.deleteAllServiceAmenities(id);
        const rolePermissions = await this.rolePermissionsRepository.destroy({
            where: {
                id,
            },
        });
        return rolePermissions;
    }
}
