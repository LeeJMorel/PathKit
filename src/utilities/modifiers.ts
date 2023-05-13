import { proficiencyMetadata } from "../consts/buildProperties";
import { Ability, PartialEntity, Proficiency, Skill } from "../api/model";

export const getAbilityModifier = (score?: number): number => {
  if (score === undefined) return 0;
  const offset = score - 10;
  return Math.floor(offset / 2);
};

export const getProficiencyModifier = (
  entity: PartialEntity,
  prof: Proficiency
): number => {
  if (!entity.build?.proficiencies) return 0;

  const { level, proficiencies, abilities } = entity.build;
  const proficiency = proficiencies[prof];

  let ability = proficiencyMetadata[prof].ability;
  if (ability === "keyability") {
    ability = entity.build.keyability as Ability;
  }
  const abilityMod = getAbilityModifier(abilities[ability as Ability]);

  if (!proficiency || Number(proficiency) === 0) {
    return Number(abilityMod);
  }
  return Number(level) + Number(abilityMod) + Number(proficiency);
};
