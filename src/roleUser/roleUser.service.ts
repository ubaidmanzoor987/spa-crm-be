import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Permission } from '../../src/permissions/permissions.entity';
import { RolePermissions } from '../../src/rolePermissions/rolePermissions.entity';
import { ServicesAmenities } from '../../src/servicesAmenities/servicesAmenities.entity';
import { CreateRoleUserDto } from './dto/create-roleUser.dto';
import { RoleUserCreatedAndUpdatedResponseDto } from './dto/roleUser-response.dto';
import { UpdateRoleUserDto } from './dto/update-roleUser.dto';
import { RoleUser } from './roleUser.entity';




@Injectable()
export class RoleUserServices {
    constructor(
        @Inject('roleUserRepository')
        private readonly roleUserRepository: typeof RoleUser
    ) { }

    async findAll() {
        const per = await this.roleUserRepository.findAll<RoleUser>();
        return per;
    }

    async findRolePermission(id:number) {
        const per = await this.roleUserRepository.findByPk(id,
            {
                attributes: ['id'],
                include: [
                    {
                        model: RolePermissions,
                        attributes: [
                            'is_allowed',
                            'permission_id',
                        ],
                        include: [
                            {
                                model: Permission,
                                attributes: ['permission_name'],
                            }
                      
                        ],
                    },
                
                ],
            },
 
      
          );

          const transformedData = {};

          per?.rolePermissions?.forEach((rolePermission) => {
            const permission = rolePermission.permission;
            const permissionName = permission ? permission.permission_name : null;
            const isAllowed = rolePermission.is_allowed === "true";
            
            if (permissionName) {
              transformedData[permissionName] = isAllowed;
            }
          });

        return transformedData;
    }
    

    async create(createRoleUserDto: CreateRoleUserDto) {
        try {
            console.log({createRoleUserDto})

            const roleUser = new RoleUser();
            roleUser.role_name = createRoleUserDto.role_name;
            roleUser.role_description = createRoleUserDto.role_description;
            const roleUserData = await roleUser.save();

            return new RoleUserCreatedAndUpdatedResponseDto(roleUserData);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateRoleUserDto: UpdateRoleUserDto) {
        const roleUser = await this.roleUserRepository.findByPk<
            RoleUser
        >(id);
        if (!roleUser) {
            throw new HttpException(
                'roleUser not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        try {
            roleUser.role_name = updateRoleUserDto.role_name || roleUser.role_name;
            roleUser.role_description = updateRoleUserDto.role_description || roleUser.role_description;
            const data = await roleUser.save();
            return new RoleUserCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        // await this.deleteAllServiceAmenities(id);
        const roleUser = await this.roleUserRepository.destroy({
            where: {
                id,
            },
        });
        return roleUser;
    }
}
