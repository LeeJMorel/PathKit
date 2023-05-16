import {
  ObjectSchema,
  object,
  array,
  string,
  number,
  boolean,
  mixed,
  tuple,
} from "yup";
import { PartialEntity } from "../api/model";
import {
  abilities,
  entityTypes,
  proficiencies,
  spellcastingTypes,
  magicTraditions,
} from "./buildProperties";
import { diceValueRegex } from "../utilities";

const errMsg = {
  r: "Required",
  noNeg: "Cannot be negative.",
  noEmpty: "Cannot be empty, remove if not needed.",
  dice: "Must be in dice roll format. e.g. 2d6+1d4+8",
};

const equipable = array().of(
  object().shape({
    name: string(),
    qty: number(),
    prof: string(),
    pot: number(),
    res: string(),
    mat: string().nullable(),
    display: string(),
    worn: boolean(),
    runes: array().of(mixed()),
    die: string(),
    str: string(),
  })
);

const spellLevel = object().shape({
  spellLevel: number(),
  list: array().of(string().defined()),
});

const entityFormSchema: ObjectSchema<PartialEntity> = object({
  id: number(),
  campaignId: number(),
  type: string().defined().oneOf(entityTypes, "Invalid entity type"),

  image: string(),
  name: string().defined().required(errMsg.r),
  initiative: number().defined().default(0),
  noteId: number().nullable(),
  damage: array()
    .of(number().defined().min(0))
    .default(() => [0]),
  tempHp: array()
    .of(number().defined().min(0))
    .default(() => [0]),
  quantity: number().default(1),
  maxHp: number().nullable(),
  conditions: array()
    .of(
      object({
        name: string().defined(),
        isValued: boolean().defined().default(false),
        value: number(),
      })
    )
    .default([]),

  build: object({
    name: string(),
    class: string(),
    desc: string(),
    level: number()
      .required()
      .default(1)
      .min(1, "Must be level 1 or above.")
      .max(25, "Cannot go above level 25."),
    attributes: object({
      ancestryhp: number().default(0).min(0, errMsg.noNeg).defined(),
      classhp: number().default(0).min(0, errMsg.noNeg).defined(),
      bonushp: number().default(0).min(0, errMsg.noNeg).defined(),
      bonushpPerLevel: number().default(0).min(0, errMsg.noNeg).defined(),
      speed: number().default(25).min(0, errMsg.noNeg).defined(),
      speedBonus: number().default(0).min(0, errMsg.noNeg).defined(),
      fly: number().default(0).min(0, errMsg.noNeg).defined(),
      burrow: number().default(0).min(0, errMsg.noNeg).defined(),
      climb: number().default(0).min(0, errMsg.noNeg).defined(),
      swim: number().default(0).min(0, errMsg.noNeg).defined(),
    }).default({}),
    ancestry: string(),
    heritage: string(),
    background: string(),
    alignment: string(),
    gender: string(),
    age: string(),
    deity: string(),
    size: number().min(0).max(6),
    languages: array().of(string().defined(errMsg.noEmpty)).default([]),
    money: object({
      pp: number().default(0),
      gp: number().default(0),
      sp: number().default(0),
      cp: number().default(0),
    }).default({}),
    keyability: string().oneOf(abilities),
    abilities: object({
      str: number()
        .min(-5, "Might as well die.")
        .max(99, "Don't be ridiculous.")
        .default(10),
      dex: number()
        .min(-5, "Might as well die.")
        .max(99, "Don't be ridiculous.")
        .default(10),
      con: number()
        .min(-5, "Might as well die.")
        .max(99, "Don't be ridiculous.")
        .default(10),
      int: number()
        .min(-5, "Might as well die.")
        .max(99, "Don't be ridiculous.")
        .default(10),
      wis: number()
        .min(-5, "Might as well die.")
        .max(99, "Don't be ridiculous.")
        .default(10),
      cha: number()
        .min(-5, "Might as well die.")
        .max(99, "Don't be ridiculous.")
        .default(10),
    }).defined(),
    proficiencies: object(
      proficiencies.reduce(
        (o, key) =>
          Object.assign(o, { [key]: number().oneOf([0, 2, 4, 6, 8]) }),
        {}
      )
    ).default({}),
    feats: array()
      .of(
        tuple([
          string().required(),
          string().optional(),
          string().optional(),
          number().optional(),
          string().optional(),
        ]).defined()
      )
      .default([]),
    specials: array().of(string().defined()).default([]),
    lores: array()
      .of(tuple([string().defined(), number().defined()]).defined())
      .default([]),
    equipment: array()
      .of(
        tuple([
          string().required(),
          number().required().default(1),
          number().optional().default(0),
          string().optional().default("0cp"),
          boolean().optional().default(false),
        ]).defined()
      )
      .default([]),
    specificProficiencies: object()
      .shape({
        trained: array().of(string()).default([]),
        expert: array().of(string()).default([]),
        master: array().of(string()).default([]),
        legendary: array().of(string()).default([]),
      })
      .default({}),
    weapons: equipable.default([]),
    armor: equipable.default([]),
    focus: object()
      .shape({
        focusPoints: number().default(0),
        primal: object()
          .shape({
            cha: object()
              .shape({
                abilityBonus: number(),
                proficiency: number(),
                itemBonus: number(),
                focusSpell: array().of(string()),
              })
              .default({}),
          })
          .default({}),
      })
      .default({}),
    spellCasters: array()
      .of(
        object({
          name: string(),
          magicTradition: string().oneOf(magicTraditions),
          spellcastingType: string().oneOf(spellcastingTypes),
          ability: string().oneOf(abilities),
          proficiency: number(),
          focusPoints: number(),
          spells: array().of(spellLevel),
          perDay: array().of(number().defined()),
        })
      )
      .default([]),
    formula: array().of(mixed()).default([]),
    pets: array().of(string().defined()).default([]), // This is recursive, they're entities
    acTotal: object({
      acProfBonus: number().default(0).min(0, errMsg.noNeg),
      acAbilityBonus: number().default(0).min(0, errMsg.noNeg),
      acItemBonus: number().default(0).min(0, errMsg.noNeg),
      acTotal: number().default(0).min(0, errMsg.noNeg),
      shieldBonus: string().default(""),
    }).default({}),
    traits: array().of(string().defined(errMsg.noEmpty)).default([]),
    resistances: array().of(string().defined(errMsg.noEmpty)).default([]),
    immunities: array().of(string().defined(errMsg.noEmpty)).default([]),
    actions: object({
      actions: array()
        .of(
          object({
            name: string().required(errMsg.r),
            actionNumber: number().min(0, errMsg.noNeg).defined(),
            attackDc: number().min(0).required(errMsg.r),
            traits: array()
              .of(string().defined(errMsg.noEmpty))
              .defined()
              .default([]),
            effect: string().required(errMsg.r),
          })
        )
        .defined()
        .default([]),
      freeActions: array()
        .of(
          object({
            name: string().required(errMsg.r),
            frequency: string().required(errMsg.r),
            trigger: string().required(errMsg.r),
            effect: string().required(errMsg.r),
          })
        )
        .defined()
        .default([]),
      reactions: array()
        .of(
          object({
            name: string().required(errMsg.r),
            trigger: string().required(errMsg.r),
            effect: string().required(errMsg.r),
          })
        )
        .defined()
        .default([]),
      passiveActions: array()
        .of(
          object({
            name: string().required(errMsg.r),
            effect: string().required(errMsg.r),
          })
        )
        .defined()
        .default([]),
      melee: array()
        .of(
          object({
            name: string().required(errMsg.r),
            actionNumber: number().min(0, errMsg.noNeg).defined(),
            attackDc: number().min(0).required(errMsg.r),
            damageType: string().required(errMsg.r),
            //TODO: regex for dice
            damageValue: string()
              .required(errMsg.r)
              .matches(diceValueRegex, errMsg.dice),
            extra: string().default(""),
            traits: array()
              .of(string().defined(errMsg.noEmpty))
              .defined()
              .default([]),
          })
        )
        .defined()
        .default([]),
      ranged: array()
        .of(
          object({
            name: string().required(errMsg.r),
            actionNumber: number().min(0, errMsg.noNeg).defined(),
            attackDc: number().min(0).required(errMsg.r),
            range: number().min(0).required(errMsg.r),
            damageType: string().required(errMsg.r),
            //TODO: regex for dice
            damageValue: string()
              .required(errMsg.r)
              .matches(diceValueRegex, errMsg.dice),
            extra: string().default(""),
            traits: array()
              .of(string().defined(errMsg.noEmpty))
              .defined()
              .default([]),
          })
        )
        .defined()
        .default([]),
    }).defined(),
  }).defined(),
  pathbuilderId: string().nullable().default(null),
});

export default entityFormSchema;
