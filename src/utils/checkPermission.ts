import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { RoleUser } from '../roleUser/roleUser.entity';
import { RolePermissions } from '../rolePermissions/rolePermissions.entity';
import { Permission } from '../permissions/permissions.entity';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../users/auth/jwt-payload.model';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class CheckPermission implements CanActivate {
  constructor(
    private readonly permissions: string,
  ) {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = await context.switchToHttp().getRequest();

    let token: string = request.headers['authorization'];
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    token = token?.split(' ')[1];
    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      const role = decodedToken.role;

      const per = await RoleUser.findByPk(role === 'superAdmin' ? 1 : role === 'admin' ? 2 : role === 'therapist' ? 3 : 0,
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

      return transformedData[this.permissions] ? true : false
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

  }
}


