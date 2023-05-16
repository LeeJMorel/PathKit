import {
  EntityType,
  Equipment,
  Feat,
  IAction,
  IFreeAction,
  IMelee,
  IPassiveAction,
  IRanged,
  IReaction,
  PartialEntity,
  PartialPath,
  PathType,
  Trait,
  TraitType,
} from "../api/model";

export const defaultPath: PartialPath = {
  type: PathType.exploration,
  entities: [],
};

export const defaultEntity: PartialEntity = {
  name: "Unknown",
  image: "",
  quantity: 1,
  type: EntityType.none,
  build: {
    level: 1,
    desc: "",
    attributes: {},
    proficiencies: {
      classDC: 0,
      perception: 0,
      fortitude: 0,
      reflex: 0,
      will: 0,
      heavy: 0,
      medium: 0,
      light: 0,
      unarmored: 0,
      advanced: 0,
      martial: 0,
      simple: 0,
      unarmed: 0,
      castingArcane: 0,
      castingDivine: 0,
      castingOccult: 0,
      castingPrimal: 0,
      acrobatics: 0,
      arcana: 0,
      athletics: 0,
      crafting: 0,
      deception: 0,
      diplomacy: 0,
      intimidation: 0,
      medicine: 0,
      nature: 0,
      occultism: 0,
      performance: 0,
      religion: 0,
      society: 0,
      stealth: 0,
      survival: 0,
      thievery: 0,
    },
    abilities: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    languages: [],
    feats: [],
    specials: [],
    lores: [],
    equipment: [],
    specificProficiencies: {},
    money: {},
    weapons: [],
    armor: [],
    focus: {},
    spellCasters: [],
    formula: [],
    pets: [],
    acTotal: {},
    traits: [],
    resistances: [],
    immunities: [],
    actions: {
      actions: [],
      passiveActions: [],
      reactions: [],
      freeActions: [],
      melee: [],
      ranged: [],
    },
  },
  conditions: [],
  damage: [0],
  tempHp: [0],
  initiative: 0,
};

export const defaultFeat: Feat = ["", "", "", 1, ""];

export const defaultTrait: Trait = ["", TraitType.Keyword];

export const defaultEquipment: Equipment = ["", 1, 0, "0cp", false];

export const defaultAction: IAction = {
  actionNumber: 0,
  name: "",
  attackDc: 0,
  traits: [],
  effect: "",
};

export const defaultPassiveAction: IPassiveAction = {
  name: "",
  effect: "",
};

export const defaultReaction: IReaction = {
  name: "",
  trigger: "",
  effect: "",
};

export const defaultFreeAction: IFreeAction = {
  name: "",
  frequency: "",
  trigger: "",
  effect: "",
};

export const defaultMelee: IMelee = {
  actionNumber: 0,
  name: "",
  attackDc: 0,
  damageType: "",
  traits: [],
  damageValue: "1d4",
  extra: "",
};

export const defaultRanged: IRanged = {
  actionNumber: 0,
  name: "",
  attackDc: 0,
  damageType: "",
  traits: [],
  damageValue: "1d4",
  extra: "",
  range: 0,
};
