import { Body, Controller, Delete, HttpException, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
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

  @Patch('edit-group/:id')
  async editGroup(@Res() res, @Body() body,@Param() param){
    try{
      const {id:organizationId} = param
    const editedGroup = await this.groupService.editGroup(body,organizationId)
          res.status(HttpStatus.OK).json({msg:editedGroup})
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete('delete-group/:groupId/:organizationId')
  async deleteGroup(@Res() res, @Param() param){
    try{
      const {groupId,organizationId} = param
      const deletedGroup = await this.groupService.deleteGroup(groupId,organizationId)
      res.status(HttpStatus.OK).json({msg:deletedGroup})
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('add-members/:groupId')
  async addMembers(@Body() body,@Param() param,@Res() res){
    try{
      const {groupId}= param
      const memberAdded = await this.groupService.addMembers(body,groupId)
      res.status(HttpStatus.OK).json({msg:memberAdded})
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
