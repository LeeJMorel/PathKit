export default `
PRAGMA foreign_keys = ON;
PRAGMA recursive_triggers = 1;

CREATE TABLE IF NOT EXISTS campaign (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  desc TEXT
);

CREATE TABLE IF NOT EXISTS note (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  createDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  modifiedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  campaignId INTEGER NOT NULL,
  entityId INTEGER,
  FOREIGN KEY(entityId) REFERENCES entity(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY(campaignId) REFERENCES campaign(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS note_modified
    AFTER UPDATE
    ON note
    FOR EACH ROW
    WHEN NEW.modifiedDate = OLD.modifiedDate
BEGIN
    UPDATE note SET modifiedDate = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TABLE IF NOT EXISTS plan (
  id INTEGER PRIMARY KEY,
  orderNum INTEGER,
  type TEXT CHECK( type IN ('exporation','encounter') ) NOT NULL DEFAULT 'exploration',
  entities TEXT NOT NULL DEFAULT '[]',
  campaignId INTEGER NOT NULL,
  FOREIGN KEY(campaignId) REFERENCES campaign(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS entity (
  id INTEGER PRIMARY KEY,
  campaignId INTEGER NOT NULL,
  name TEXT NOT NULL DEFAULT 'Unknown Adventurer',
  image TEXT,
  type TEXT CHECK( type IN ('Shop','Monster','Player','NPC','none') ) NOT NULL DEFAULT 'none',
  initiative INTEGER CHECK( initiative >= 0 ) NOT NULL DEFAULT 0,
  noteId INTEGER,
  build TEXT NOT NULL DEFAULT '{}',
  damage INTEGER NOT NULL DEFAULT 0,
  tempHp INTEGER NOT NULL DEFAULT 0,
  conditions TEXT NOT NULL DEFAULT '[]',
  FOREIGN KEY(campaignId) REFERENCES campaign(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY(noteId) REFERENCES note(id) ON UPDATE CASCADE ON DELETE SET NULL
);
`;