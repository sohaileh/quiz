import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create-group')
  async createOrganizationGroup(@Res() res,@Body() body){
    try{
      const organizationGroups = await this.groupService.createOrganizationGroup(body)
      res.status(HttpStatus.OK).json(organizationGroups)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('edit-group/:organizationId/:groupId')
  async editGroup(@Res() res, @Body() body,@Param() param){
    try{
      const {organizationId,groupId} = param
    const organizationGroups = await this.groupService.editGroup(body,organizationId,groupId)
          res.status(HttpStatus.OK).json(organizationGroups)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete('delete-group/:groupId/:organizationId')
  async deleteGroup(@Res() res, @Param() param){
    try{
      const {groupId,organizationId} = param
      const organizationGroups = await this.groupService.deleteGroup(groupId,organizationId)
      res.status(HttpStatus.OK).json(organizationGroups)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('add-members/:groupId')
  async addMembers(@Body() body,@Param() param,@Res() res){
    try{
      const {groupId}= param
      const groupUsers = await this.groupService.addMembers(body,groupId)
      res.status(HttpStatus.OK).json(groupUsers)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('get-organization-groups/:organizationId')
  async getOrganizationGroups(@Param() param,@Res() res){
    try{
      const{organizationId}=param
      const organizations = await this.groupService.getOrganizationGroups(organizationId)
      res.status(HttpStatus.OK).json(organizations)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
