import merge from "lodash.merge";
import { defaultEntity, defaultEquipment, defaultFeat } from "../consts";
import { IEntity, IRawEntity, PartialEntity } from "../api/model";

// my job is to parse json from the database
export const transformRawEntity = (rawEntity: IRawEntity): IEntity =>
  ({
    ...rawEntity,
    build: JSON.parse(rawEntity.build || "{}"),
    conditions: JSON.parse(rawEntity.conditions || "[]"),
    damage: JSON.parse(rawEntity.conditions || "[]"),
    tempHp: JSON.parse(rawEntity.conditions || "[]"),
  } as IEntity);

export const transformPathbuilderBuild = (
  result: PartialEntity["build"]
): PartialEntity["build"] => {
  const resultEquipment = result.equipment.map((e) => {
    const newEquipment = [...merge(defaultEquipment, e)];
    return newEquipment;
  });
  const resultFeats = result.feats.map((f) => {
    const newFeat = [...merge(defaultFeat, f)].map((v) =>
      v === null ? "" : v
    );
    return newFeat;
  });
  const resultBuild: PartialEntity["build"] = merge(
    defaultEntity.build,
    result,
    { equipment: resultEquipment, feats: resultFeats }
  );

  return resultBuild;
};
