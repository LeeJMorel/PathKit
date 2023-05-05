export default `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS campaign (
  campaign_id INTEGER PRIMARY KEY,
  campaign_name TEXT NOT NULL,
  campaign_desc TEXT
);

CREATE TABLE IF NOT EXISTS note (
  note_id INTEGER PRIMARY KEY,
  note_title TEXT,
  note_body TEXT NOT NULL,
  note_create_date DATETIME DEFAULT current_timestamp,
  note_modified_date DATETIME DEFAULT current_timestamp,
  campaign_id INTEGER NOT NULL,
  FOREIGN KEY(campaign_id) REFERENCES campaign(campaign_id) ON UPDATE SET NULL ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS entity (
  entity_id INTEGER PRIMARY KEY,
  entity_type TEXT,
  entity_initiative INTEGER,
  campaign_id INTEGER NOT NULL,
  entity_desc TEXT,
  entity_notes TEXT,
  entity_image TEXT,
  entity_ancestry TEXT,
  entity_heritage TEXT,
  entity_background TEXT,
  entity_class TEXT,
  entity_size TEXT,
  entity_alignment TEXT,
  entity_traits TEXT,
  entity_deity TEXT,
  entity_level INTEGER,
  entity_experience INTEGER,
  entity_xp_to_level INTEGER,
  entity_hero_points INTEGER,
  entity_current_hp INTEGER,
  entity_max_hp INTEGER,
  entity_bonus_hp INTEGER,
  entity_temp_hp INTEGER,
  entity_condition_flag TEXT,
  entity_abilities TEXT,
  entity_resistances TEXT,
  entity_immunities TEXT NOT NULL,
  entity_conditions TEXT,
  entity_class_dc INTEGER,
  entity_perception INTEGER,
  entity_fortitude INTEGER,
  entity_reflex INTEGER,
  entity_will INTEGER,
  entity_heavy INTEGER,
  entity_medium INTEGER,
  entity_light INTEGER,
  entity_unarmored INTEGER,
  entity_advanced INTEGER,
  entity_martial INTEGER,
  entity_simple INTEGER,
  entity_unarmed INTEGER,
  entity_arcane_casting INTEGER,
  entity_divine_casting INTEGER,
  entity_occult_casting INTEGER,
  entity_primal_casting INTEGER,
  entity_acrobatics INTEGER,
  entity_arcana INTEGER,
  entity_athletics INTEGER,
  entity_crafting INTEGER,
  entity_deception INTEGER,
  entity_diplomacy INTEGER,
  entity_intimidation INTEGER,
  entity_medicine INTEGER,
  entity_nature INTEGER,
  entity_occultism INTEGER,
  entity_performance INTEGER,
  entity_religion INTEGER,
  entity_society INTEGER,
  entity_stealth INTEGER,
  entity_survival INTEGER,
  entity_thievery INTEGER,
  entity_specific_trained_prof TEXT,
  entity_specific_expert_prof TEXT,
  entity_specific_master_prof TEXT,
  entity_armor_name TEXT DEFAULT 'Unarmored',
  entity_armor_prof_type TEXT DEFAULT 'Unarmored',
  entity_armor_bonus INTEGER DEFAULT 0,
  entity_armor_equipped BOOLEAN,
  entity_armor_traits TEXT,
  entity_weapons TEXT,
  entity_ancestry_feats TEXT,
  entity_skill_feats TEXT,
  entity_general_feats TEXT,
  entity_class_feats TEXT,
  entity_bonus_feats TEXT,
  entity_special_features TEXT,
  entity_worn_items TEXT,
  entity_readied_items TEXT,
  entity_items TEXT,
  entity_currency TEXT,
  entity_focus_points TEXT,
  entity_focus_spells TEXT,
  entity_spell_pools TEXT,
  FOREIGN KEY(campaign_id) REFERENCES campaign(campaign_id) ON UPDATE SET NULL ON DELETE SET NULL,

  CHECK (
    entity_level >= 1
    AND entity_level <= 20
    AND entity_experience >= 0
    AND entity_xp_to_level >= entity_experience
    AND entity_hero_points >= 0
    AND entity_hero_points <= 3
    AND entity_current_hp >= 0
    AND entity_max_hp >= 0
    AND entity_bonus_hp >= 0
    AND entity_temp_hp >= 0
    AND entity_armor_bonus >= 0
  )
);

CREATE TABLE IF NOT EXISTS plan (
  plan_id INTEGER PRIMARY KEY,
  plan_order_num INTEGER,
  plan_type TEXT,
  plan_entities TEXT,
  campaign_id INTEGER NOT NULL,
  FOREIGN KEY(campaign_id) REFERENCES campaign(campaign_id) ON UPDATE SET NULL ON DELETE SET NULL
);`;
