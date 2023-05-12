import { EntityType, PartialEntity } from "../api/model";
import { getAbilityModifier } from "./modifiers";

export const getPlayerMaxHp = (entity: PartialEntity): number => {
  let result = entity.maxHp || Infinity;
  if (entity.type !== EntityType.Player) return result;
  const { level, attributes, abilities } = entity.build;
  const con = getAbilityModifier(abilities?.con);
  const {
    ancestryhp = 0,
    classhp = 0,
    bonushp = 0,
    bonushpPerLevel = 0,
  } = attributes;
  result = level * (bonushpPerLevel + classhp + con) + ancestryhp + bonushp;
  return result;
};
