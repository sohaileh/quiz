import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  serverUrl = environment.serverURL;
  groupModel:any={}
  constructor(private http: HttpClient) {}
  createGroup(id:any,name:any){
    this.groupModel.organizerId=id;
    this.groupModel.groupName=name;
    this.groupModel.organizationId=localStorage.getItem('organizationId')
    return this.http.post(`${this.serverUrl}group/create-group`, this.groupModel);
  }
  getGroups(organizerId:any){
    return this.http.get(`${this.serverUrl}group/get-organization-groups/${organizerId}` );
  }
  renameGroup(groupModel:any,groupId:any){
    const organizationId=localStorage.getItem('userId')
    return this.http.patch(`${this.serverUrl}group/edit-group/${organizationId}/${groupId}`,groupModel );
  }
  saveMemberDetails(groupId:any,groupModel:any){
    groupModel.organizerId=localStorage.getItem('userId')
    groupModel.organizationId=localStorage.getItem('organizationId')
    return this.http.post(`${this.serverUrl}group/add-members/${groupId}`,groupModel);
  }
  getGroupMembers(groupId:any){
    return this.http.get(`${this.serverUrl}group/get-group-members/${groupId}` );
  }
  deleteGroup(groupDetails){
    const {_id:groupId,organizerId}= groupDetails
    return this.http.delete(`${this.serverUrl}group/delete-group/${groupId}/${organizerId}`);
  }
  getAssignedQuizes(groupId:any){
    return this.http.get(`${this.serverUrl}assign/get-assigned-group-quizzes/${groupId}`);
  }
 deleteMember(userId:any,groupId:any){
  return this.http.delete(`${this.serverUrl}group/delete-group-member/${userId}/${groupId}`);
 }
  assignQuizzesToGroup(groupId,assignedQuiz){
    const groupDetails ={assignedQuizzes:assignedQuiz}
    const organizerId= localStorage.getItem('userId')
    const organizationId= localStorage.getItem('organizationId')
    return this.http.post(`${this.serverUrl}assign/assign-quiz/${groupId}/${organizerId}/${organizationId}`,groupDetails);
  }
  getGroup(groupId:any){
    return this.http.get(`${this.serverUrl}group/get-organization-group/${groupId}` );
  }
}
