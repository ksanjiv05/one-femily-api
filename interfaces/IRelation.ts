import { Document } from "mongoose";

type RelationHierarchyProps = {
  rid: string;
  level: number;
  parentRid: string;
  parentLevel: number;
  relationType: string; // like mom dad son etc
  relationName: string;
};

export interface IRelation extends Document {
  uid: string;
  // relationUid:string;
  level?: number;
  parentId: string; // parent id of this relation
  parentLevel?: number;
  relationType: string; // like mom dad son etc
  relationName: string;
  relationUid: string; // which people you add
  photoURL: string;
}
