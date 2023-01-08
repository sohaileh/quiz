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
    this.groupModel.organizationId=id;
    this.groupModel.groupName=name;
    return this.http.post(`${this.serverUrl}group/create-group`, this.groupModel);
  }
  getGroups(organizationId:any){
    console.log(organizationId)
    return this.http.get(`${this.serverUrl}group/get-organization-groups/${organizationId}` );
  }
  renameGroup(groupModel:any,groupId:any){
    const organizationId=localStorage.getItem('userId')
    return this.http.patch(`${this.serverUrl}group/edit-group/${organizationId}/${groupId}`,groupModel );
  }
  saveMemberDetails(groupId:any,groupModel:any){
    groupModel.organizationId=localStorage.getItem('userId')
    return this.http.post(`${this.serverUrl}group/add-members/${groupId}`,groupModel);
  }
  getGroupMembers(groupId:any){
    return this.http.get(`${this.serverUrl}group/get-group-members/${groupId}` );
  }
}
