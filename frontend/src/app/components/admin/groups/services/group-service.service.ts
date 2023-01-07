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
}
