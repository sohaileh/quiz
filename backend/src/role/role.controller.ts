import { Body, Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/authorization/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/gaurds/auth.gaurd';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {

  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
  @Get('get-roles')
  async getRoles(@Body() body,@Res() res){
    try{
      const roles = await this.roleService.getRoles()
      res.status(HttpStatus.OK).json(roles)
    }catch(err){
      res.status(HttpStatus.BAD_REQUEST).json(err.message);
    }

  }
}
