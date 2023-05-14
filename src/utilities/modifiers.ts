import { proficiencyMetadata } from "../consts/buildProperties";
import { Ability, PartialEntity, Proficiency, Skill } from "../api/model";

export const getAbilityModifier = (
  score?: number,
  asString?: boolean
): number | string => {
  if (score === undefined) return 0;
  const offset = score - 10;
  const result = Math.floor(offset / 2);
  if (asString) {
    return result < 0 ? `${result}` : `+${result}`;
  }
  return result;
};

export const getProficiencyModifier = (
  entity: PartialEntity,
  prof: Proficiency,
  asString?: boolean
): number | string => {
  if (!entity.build?.proficiencies) return 0;

  const { level, proficiencies, abilities } = entity.build;
  const proficiency = proficiencies[prof];

  let ability = proficiencyMetadata[prof].ability;
  if (ability === "keyability") {
    ability = entity.build.keyability as Ability;
  }
  const abilityMod = getAbilityModifier(abilities[ability as Ability]);

  let result;
  if (!proficiency || Number(proficiency) === 0) {
    result = Number(abilityMod);
  } else {
    result = Number(level) + Number(abilityMod) + Number(proficiency);
  }

  if (asString) {
    return result < 0 ? `${result}` : `+${result}`;
  }
  return result;
};
