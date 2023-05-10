import { EntityType, PartialEntity } from "../api/model";

export const defaultEntity: PartialEntity = {
  name: "Unknown",
  type: EntityType.none,
  build: {
    level: 1,
    attributes: {},
  },
  conditions: [],
  damage: 0,
  tempHp: 0,
  initiative: 0,
};
