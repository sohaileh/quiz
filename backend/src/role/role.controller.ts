import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {

  }

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
