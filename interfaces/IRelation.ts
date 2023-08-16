import { Document } from "mongoose";

type RelationHierarchyProps={
    rid:string;
    level:number;
    parentRid:string;
    parentLevel:number;
    relationType:string; // like mom dad son etc
    relationName:string;
}

export interface IRelation extends Document {
    uid: string;
    mongoUid:string;
    relationHierarchy : RelationHierarchyProps[]
}