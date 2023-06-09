export default `
PRAGMA foreign_keys = ON;
PRAGMA recursive_triggers = 1;

CREATE TABLE IF NOT EXISTS campaign (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  desc TEXT
);

CREATE TABLE IF NOT EXISTS note (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  createDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  modifiedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  campaignId TEXT NOT NULL,
  entityId TEXT,
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

CREATE TABLE IF NOT EXISTS path (
  id TEXT PRIMARY KEY,
  orderNum INTEGER,
  type TEXT CHECK( type IN ('exploration','encounter') ) NOT NULL DEFAULT 'exploration',
  entities TEXT NOT NULL DEFAULT '[]',
  campaignId TEXT NOT NULL,
  FOREIGN KEY(campaignId) REFERENCES campaign(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS entity (
  id TEXT PRIMARY KEY,
  campaignId TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Unknown',
  image TEXT,
  type TEXT CHECK( type IN ('Structure','Monster','Player','NPC','Hazard','none') ) NOT NULL DEFAULT 'none',
  initiative INTEGER CHECK( initiative >= 0 ) NOT NULL DEFAULT 0,
  noteId TEXT,
  build TEXT NOT NULL DEFAULT '{}',
  damage TEXT NOT NULL DEFAULT '[0]',
  tempHp TEXT NOT NULL DEFAULT '[0]',
  maxHp INTEGER,
  conditions TEXT NOT NULL DEFAULT '[]',
  quantity INTEGER DEFAULT 1,
  pathbuilderId TEXT,
  FOREIGN KEY(campaignId) REFERENCES campaign(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY(noteId) REFERENCES note(id) ON UPDATE CASCADE ON DELETE SET NULL
);
`;
