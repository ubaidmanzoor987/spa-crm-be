import { HttpException, HttpStatus } from "@nestjs/common";
import { RolePermissions } from "../rolePermissions/rolePermissions.entity";
import { Permission } from "../permissions/permissions.entity";
import { RolesAndpermissionsData } from "../shared/permissionDictionary/dictionary";
import { RoleUser } from "../roleUser/roleUser.entity";
import { initialRoleUsers } from "../shared/enum/roles";

export async function initialPermissionsCreation() {

    try {
        const promises = [];
        initialRoleUsers.forEach(data => {
            const roleUser = new RoleUser();
            roleUser.role_name = data.name;
            roleUser.role_description = data.description.toString();
            const roleUserData = roleUser.save();
            promises.push(roleUserData);
        });
        if (promises.length > 0) {
            await Promise.all(promises);
        }
    }catch (err) {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  
    try {
      const permissionsData = [];
  
      for (const [role, permissions] of Object.entries(RolesAndpermissionsData)) {
        const createPermissionDto = permissions;
  
        for (const permissionName in createPermissionDto) {
          if (createPermissionDto.hasOwnProperty(permissionName)) {
            const permissionExist = await Permission.findAll({
              where: {
                permission_name: permissionName,
              },
            });
  
            if (permissionExist.length === 0) {
              const permission = new Permission();
              permission.permission_name = permissionName;
              const permissionData = await permission.save();
              permissionsData.push(permissionData);
              
              const rolePer = new RolePermissions();
              rolePer.permission_id = permissionData.id;
              rolePer.is_allowed = createPermissionDto[permissionName].toString();
              rolePer.user_role_id =
                role === 'superAdmin'
                  ? "1"
                  : role === 'admin'
                  ? "2"
                  // : role === 'therapist'
                  // ? "3"
                  : "0";
              await rolePer.save();

            }
            if (permissionExist.length === 1) {

              const rolePermissionsExist = await RolePermissions.findAll({
                where: {
                    permission_id: permissionExist[0].id,
                    user_role_id:    role === 'superAdmin'
                    ? "1"
                    : role === 'admin'
                    ? "2"
                    // : role === 'therapist'
                    // ? "3"
                    : "0",
                },
              });
            if (rolePermissionsExist.length === 0) {
              
              const rolePer = new RolePermissions();
              rolePer.permission_id = permissionExist[0].id;
              rolePer.is_allowed = createPermissionDto[permissionName].toString();
              rolePer.user_role_id =
                role === 'superAdmin'
                  ? "1"
                  : role === 'admin'
                  ? "2"
                  : role === 'therapist'
                  ? "3"
                  : "0";
              await rolePer.save();
            }
        }

          }
        }
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
