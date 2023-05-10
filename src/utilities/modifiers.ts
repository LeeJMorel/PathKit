import { skillsMetadata } from "../consts/buildProperties";
import { Ability, PartialEntity, Skill } from "../api/model";

export const getAbilityModifier = (score?: number): number => {
  if (score === undefined) return 0;
  const offset = score - 10;
  return Math.floor(offset / 2);
};

export const getSkillModifier = (
  entity: PartialEntity,
  skill: Skill
): number => {
  if (!entity.build?.proficiencies) return 0;

  const { level, proficiencies, abilities } = entity.build;
  const proficiency = proficiencies[skill];

  if (!proficiency || !abilities) return 0;

  const ability = skillsMetadata[skill].ability;
  const abilityMod = getAbilityModifier(abilities[ability]);
  return level + abilityMod + proficiency;
};
