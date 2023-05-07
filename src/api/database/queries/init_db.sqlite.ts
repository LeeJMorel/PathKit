export default `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS campaign (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  desc TEXT
);

CREATE TABLE IF NOT EXISTS note (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  body TEXT NOTE NULL DEFAULT '',
  createDate DATETIME DEFAULT current_timestamp,
  modifiedDate DATETIME DEFAULT current_timestamp,
  campaignId INTEGER NOT NULL,
  FOREIGN KEY(campaignId) REFERENCES campaign(id) ON UPDATE SET NULL ON DELETE SET NULL
);

CREATE TRIGGER IF NOT EXISTS note_modified
  AFTER UPDATE ON note
BEGIN
  UPDATE note SET modifiedDate = current_timestamp;
END;

CREATE TABLE IF NOT EXISTS entity (
  id INTEGER PRIMARY KEY,
  type TEXT,
  initiative INTEGER,
  campaignId INTEGER NOT NULL,
  desc TEXT,
  notes TEXT,
  image TEXT,
  ancestry TEXT,
  heritage TEXT,
  background TEXT,
  class TEXT,
  size TEXT,
  alignment TEXT,
  traits TEXT,
  deity TEXT,
  level INTEGER,
  experience INTEGER,
  xpToLevel INTEGER,
  heroPoints INTEGER,
  currentHp INTEGER,
  maxHp INTEGER,
  bonusHp INTEGER,
  tempHp INTEGER,
  conditionFlag TEXT,
  abilities TEXT,
  resistances TEXT,
  immunities TEXT NOT NULL,
  conditions TEXT,
  classDc INTEGER,
  perception INTEGER,
  fortitude INTEGER,
  reflex INTEGER,
  will INTEGER,
  heavy INTEGER,
  medium INTEGER,
  light INTEGER,
  unarmored INTEGER,
  advanced INTEGER,
  martial INTEGER,
  simple INTEGER,
  unarmed INTEGER,
  arcaneCasting INTEGER,
  divineCasting INTEGER,
  occultCasting INTEGER,
  primalCasting INTEGER,
  acrobatics INTEGER,
  arcana INTEGER,
  athletics INTEGER,
  crafting INTEGER,
  deception INTEGER,
  diplomacy INTEGER,
  intimidation INTEGER,
  medicine INTEGER,
  nature INTEGER,
  occultism INTEGER,
  performance INTEGER,
  religion INTEGER,
  society INTEGER,
  stealth INTEGER,
  survival INTEGER,
  thievery INTEGER,
  specificTrainedProf TEXT,
  specificExpertProf TEXT,
  specificMasterProf TEXT,
  armorName TEXT DEFAULT 'Unarmored',
  armorProfType TEXT DEFAULT 'Unarmored',
  armorBonus INTEGER DEFAULT 0,
  armorEquipped BOOLEAN,
  armorTraits TEXT,
  weapons TEXT,
  ancestryFeats TEXT,
  skillFeats TEXT,
  generalFeats TEXT,
  classFeats TEXT,
  bonusFeats TEXT,
  specialFeatures TEXT,
  wornItems TEXT,
  readiedItems TEXT,
  items TEXT,
  currency TEXT,
  focusPoints TEXT,
  focusSpells TEXT,
  spellPools TEXT,
  FOREIGN KEY(campaignId) REFERENCES campaign(id) ON UPDATE SET NULL ON DELETE SET NULL,

  CHECK (
    level >= 1
    AND level <= 20
    AND experience >= 0
    AND xpToLevel >= experience
    AND heroPoints >= 0
    AND heroPoints <= 3
    AND currentHp >= 0
    AND maxHp >= 0
    AND bonusHp >= 0
    AND tempHp >= 0
    AND armorBonus >= 0
  )
);

CREATE TABLE IF NOT EXISTS plan (
  id INTEGER PRIMARY KEY,
  orderNum INTEGER,
  type TEXT,
  entities TEXT,
  campaignId INTEGER NOT NULL,
  FOREIGN KEY(campaignId) REFERENCES campaign(id) ON UPDATE SET NULL ON DELETE SET NULL
);
`;
