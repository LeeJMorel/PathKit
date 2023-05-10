import { EntityType, PartialEntity } from "../api/model";

export const getMaxPlayerHp = (entity: PartialEntity): number => {
  let result = entity.maxHp || Infinity;
  if (entity.type !== EntityType.Player) return result;
  const { level, attributes } = entity.build;
  const {
    ancestryhp = 0,
    classhp = 0,
    bonushp = 0,
    bonushpPerLevel = 0,
  } = attributes;
  result = level * (bonushpPerLevel + ancestryhp + classhp) + bonushp;
  return result;
};
