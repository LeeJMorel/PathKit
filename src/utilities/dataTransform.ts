import { IEntity, IRawEntity } from "../api/model";

// my job is to parse json from the database
export const transformRawEntity = (rawEntity: IRawEntity): IEntity =>
  ({
    ...rawEntity,
    build: JSON.parse(rawEntity.build || "{}"),
    conditions: JSON.parse(rawEntity.conditions || "[]"),
  } as IEntity);
