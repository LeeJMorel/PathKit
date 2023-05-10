import { IEntity, IRawEntity } from "../api/model";

//my job is to convert image strings <->images
export const tranformRawEntity = (rawEntity: IRawEntity): IEntity =>
  ({
    ...rawEntity,
    build: JSON.parse(rawEntity.build || "{}"),
    conditions: JSON.parse(rawEntity.conditions || "[]"),
  } as IEntity);
