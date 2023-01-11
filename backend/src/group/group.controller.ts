import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/authorization/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/gaurds/auth.gaurd';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
  @Post('create-group')
  async createOrganizationGroup(@Res() res,@Body() body){
    try{
      const organizationGroups = await this.groupService.createOrganizationGroup(body)
      res.status(HttpStatus.OK).json(organizationGroups)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
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
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
  @Delete('delete-group/:groupId/:organizerId')
  async deleteGroup(@Res() res, @Param() param){
    try{
      const {groupId,organizerId} = param
      const organizationGroups = await this.groupService.deleteGroup(groupId,organizerId)
      res.status(HttpStatus.OK).json(organizationGroups)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
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
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
  @Get('get-organization-groups/:organizerId')
  async getOrganizationGroups(@Param() param,@Res() res){
    try{
      const{organizerId}=param
      const organizations = await this.groupService.getOrganizationGroups(organizerId)
      res.status(HttpStatus.OK).json(organizations)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
  @Get('get-group-members/:groupId')
  async getGroupMembers(@Param() param ,@Res() res){
    try{
      const {groupId}= param
        const groupMembers= await this.groupService.getGroupMembers(groupId)
        res.status(HttpStatus.OK).json(groupMembers)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
  @Delete('delete-group-member/:userId/:groupId')

  async deleteMember(@Res() res, @Param() param){
    try{
      const {userId,groupId} = param
      const organizationGroups = await this.groupService.deleteMember(userId,groupId)
      res.status(HttpStatus.OK).json(organizationGroups)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('organizer')
  @Get('get-organization-group/:groupId')
  async getGroup(@Param() param ,@Res() res){
    try{
      const {groupId}= param
        const groupMembers= await this.groupService.getGroup(groupId)
        res.status(HttpStatus.OK).json(groupMembers)
    }catch(err){
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
