import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Permission } from './permissions.entity';
import { PermissionCreatedAndUpdatedResponseDto } from './dto/permissions-response.dto';
import { ConfigService } from '../shared/config/config.service';
import { ServicesAmenities } from '../../src/servicesAmenities/servicesAmenities.entity';
import { CreatePermissionDto } from './dto/create-permissions.dto';
import { RolePermissions } from '../../src/rolePermissions/rolePermissions.entity';
import { UpdatePermissionDto } from './dto/update-permissions.dto';

@Injectable()
export class PermissionServices {
    constructor(
        @Inject('permissionsRepository')
        private readonly permissionsRepository: typeof Permission
    ) {}


    async findAll() {
        const per = await this.permissionsRepository.findAll<Permission>({
        });

        return per;
    }

    async create(createPermissionDto: CreatePermissionDto) {
        try {
            const permission = new Permission();
            permission.permission_name = createPermissionDto.permission_name;
            const permissionData = await permission.save();
            return new PermissionCreatedAndUpdatedResponseDto(permissionData);

        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        const permission = await this.permissionsRepository.findByPk<
            Permission
        >(id);
        if (!permission) {
            throw new HttpException(
                'permission not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        try {
            permission.permission_name =
                updatePermissionDto.permission_name ||
                permission.permission_name;
            const data = await permission.save();
            return new PermissionCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const service = await this.permissionsRepository.destroy({
            where: {
                id,
            },
        });
        return service;
    }
}
