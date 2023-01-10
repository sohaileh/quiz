import { ObjectId } from "mongoose";

export class assignModelDto{
    groupId:ObjectId;
    assignedQuizzes:any[];
    organizationId:ObjectId;
    organizerId:ObjectId

}