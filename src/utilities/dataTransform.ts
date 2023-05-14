import merge from "lodash.merge";
import { defaultEntity, defaultEquipment } from "../consts";
import { IEntity, IRawEntity, PartialEntity } from "../api/model";

// my job is to parse json from the database
export const transformRawEntity = (rawEntity: IRawEntity): IEntity =>
  ({
    ...rawEntity,
    build: JSON.parse(rawEntity.build || "{}"),
    conditions: JSON.parse(rawEntity.conditions || "[]"),
  } as IEntity);

export const transformPathbuilderBuild = (
  result: PartialEntity["build"]
): PartialEntity["build"] => {
  const resultEquipment = result.equipment.map((e) =>
    merge(defaultEquipment, e)
  );
  const resultBuild: PartialEntity["build"] = merge(
    defaultEntity.build,
    result,
    { equipment: resultEquipment }
  );

  return resultBuild;
};
