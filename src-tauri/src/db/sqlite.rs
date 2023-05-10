use sqlx::{migrate::MigrateDatabase, sqlite::SqliteQueryResult, Sqlite, SqlitePool};
use std::result::Result;

async fn create_schema(db_url: &str) -> Result<SqliteQueryResult, sqlx::Error> {
    let pool = SqlitePool::connect(&db_url).await?;
    let qry =
    "PRAGMA foreign_keys = ON ;".to_owned()
        +"CREATE TABLE IF NOT EXISTS campaign"
        +"("
            +"campaign_id                 INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"
            +"campaign_name               TEXT NOT NULL,"
            +"campaign_desc               TEXT NOT NULL"
        +");"
        +"CREATE TABLE IF NOT EXISTS notes"
        +"("
            +"notes_id                    INTEGER PRIMARY KEY AUTOINCREMENT,"
            +"notes_name                  TEXT,"
            +"notes_body                  TEXT,"
            +"campaign_id                 INTEGER NOT NULL DEFAULT 1,"
            +"FOREIGN KEY(campaign_id)    REFERENCES campaign(campaign_id) ON UPDATE SET NULL ON DELETE SET NULL"
        +");"
        +"CREATE TABLE IF NOT EXISTS entity"
        +"("
            +"entity_id                   INTEGER PRIMARY KEY AUTOINCREMENT,"
            +"entity_type                 TEXT,"
            +"is_active                   BOOLEAN NOT NULL DEFAULT 0,"
            +"campaign_id                 INTEGER NOT NULL DEFAULT 1,"
            // entity general attributes
            +"entity_name                 TEXT NOT NULL,"
            +"entity_bio                  TEXT,"
            +"entity_notes                TEXT,"
            +"entity_image                TEXT,"
            +"entity_ancestry             TEXT,"
            +"entity_heritage             TEXT,"
            +"entity_background           TEXT,"
            +"entity_class                TEXT,"
            +"entity_size                 TEXT,"
            +"entity_alignment            TEXT,"
            +"entity_traits               TEXT," // stores string to parse into array[string] of traits
            +"entity_deity                TEXT,"
            +"entity_level                INTEGER,"
            +"entity_experience           INTEGER,"
            +"entity_xp_to_level          INTEGER,"
            +"entity_hero_points          INTEGER,"
            +"entity_condition_flag       TEXT,"
            // entity attribute attributes
            +"entity_abilities            TEXT," // needs to be array[text,boolean,int]. perhaps refactor
            +"entity_current_hp           INTEGER,"
            +"entity_max_hp               INTEGER,"
            +"entity_bonus_hp             INTEGER,"
            +"entity_temp_hp              INTEGER,"
            +"entity_speeds               TEXT," // stores string to parse into array[string,int] of movement name, movement speed
            +"entity_resistances          TEXT," // stores string to parse into array[string,int] of resistance name, resistance value
            +"entity_immunities           TEXT NOT NULL," // stores string to parse into array[string] of immunity names
            +"entity_conditions           TEXT," // stores string to parse into array[string,int] of condition name, condition value
            // entity proficiency attributes
            +"entity_class_dc             INTEGER,"
            +"entity_perception           INTEGER,"
            +"entity_fortitude            INTEGER,"
            +"entity_reflex               INTEGER,"
            +"entity_will                 INTEGER,"
            +"entity_heavy                INTEGER,"
            +"entity_medium               INTEGER,"
            +"entity_light                INTEGER,"
            +"entity_unarmored            INTEGER,"
            +"entity_advanced             INTEGER,"
            +"entity_martial              INTEGER,"
            +"entity_simple               INTEGER,"
            +"entity_unarmed              INTEGER,"
            +"entity_arcane_casting       INTEGER,"
            +"entity_divine_casting       INTEGER,"
            +"entity_occult_casting       INTEGER,"
            +"entity_primal_casting       INTEGER,"
            +"entity_acrobatics           INTEGER,"
            +"entity_arcana               INTEGER,"
            +"entity_athletics            INTEGER,"
            +"entity_crafting             INTEGER,"
            +"entity_deception            INTEGER,"
            +"entity_diplomacy            INTEGER,"
            +"entity_intimidation         INTEGER,"
            +"entity_medicine             INTEGER,"
            +"entity_nature               INTEGER,"
            +"entity_occultism            INTEGER,"
            +"entity_performance          INTEGER,"
            +"entity_religion             INTEGER,"
            +"entity_society              INTEGER,"
            +"entity_stealth              INTEGER,"
            +"entity_survival             INTEGER,"
            +"entity_thievery             INTEGER,"
            +"entity_lores                TEXT,"    // stores string to parse into array[string,int] of lore name, bonus value
            +"entity_specific_trained_prof               TEXT,"    // stores string to parse into array[string] of weapon/skill having trained prof
            +"entity_specific_expert_prof                TEXT,"    // stores string to parse into array[string] of weapon/skill having expert prof
            +"entity_specific_master_prof                TEXT,"    // stores string to parse into array[string] of weapon/skill having master prof
            +"entity_specific_legendary_prof             TEXT,"    // stores string to parse into array[string] of weapon/skill having legendary prof
            // entity worn armor attributes
            +"entity_armor_name           TEXT DEFAULT 'Unarmored',"
            +"entity_armor_prof_type      TEXT DEFAULT 'Unarmored',"
            +"entity_armor_bonus          INTEGER DEFAULT 0,"
            +"entity_armor_equipped       BOOLEAN,"
            +"entity_armor_traits         TEXT,"    // stores string to parse into array[string] of armor traits
            // entity weapon attributes
            +"entity_weapons              TEXT,"    // stores array[weapon_item]
            // entity feats and features attributes
            +"entity_ancestry_feats       TEXT,"    // stores string to parse into array[string,int] of feat name, level value when feat gained
            +"entity_skill_feats          TEXT,"    // stores string to parse into array[string,int] of feat name, level value when feat gained
            +"entity_general_feats        TEXT,"    // stores string to parse into array[string,int] of feat name, level value when feat gained
            +"entity_class_feats          TEXT,"    // stores string to parse into array[string,int] of feat name, level value when feat gained
            +"entity_bonus_feats          TEXT,"    // stores string to parse into array[string,int] of feat name, level value when feat gained
            +"entity_special_features     TEXT,"    // stores string to parse into array[string] of feat name, level value when feat gained
            // entity equipment and inventory attributes
            +"entity_worn_items           TEXT,"    // stores string to parse into array[string,int] of item name, item bulk value
            +"entity_readied_items        TEXT,"    // stores string to parse into array[string,int] of item name, item bulk value
            +"entity_items                TEXT,"    // stores string to parse into array[string,int] of item name, item bulk value
            +"entity_currency             TEXT,"    // stores string to parse into array[int,int,int,int] of currency values (Platinum,Gold,Silver,Copper)
            // entity spells and magic attributes
            +"entity_focus_points         TEXT,"    // stores string to parse into array[int,int] of currency values
            +"entity_focus_spells         TEXT,"    // stores string to parse into array[string,string,string,int] of spell name, key ability, magic type, spell level value
            +"entity_spell_pools          TEXT,"    // stores string to parse into array[spell_pool]
            +"FOREIGN KEY(campaign_id)    REFERENCES campaign(campaign_id) ON UPDATE SET NULL ON DELETE SET NULL,"
            +"CHECK ("
                    +"entity_level >= 1 "
                    +"AND entity_level <= 20 "
                    +"AND entity_experience >= 0 "
                    +"AND entity_xp_to_level >= entity_experience "
                    +"AND entity_hero_points >= 0 "
                    +"AND entity_hero_points <= 3 "
                    +"AND entity_current_hp >= 0 "
                    +"AND entity_max_hp >= 0 "
                    +"AND entity_bonus_hp >= 0 "
                    +"AND entity_temp_hp >= 0 "
                    +"AND entity_armor_bonus >= 0"
                +")"
        +");"
        +"CREATE TABLE IF NOT EXISTS path"
        +"("
            +"path_id                     INTEGER PRIMARY KEY AUTOINCREMENT,"
            +"path_order_num              INTEGER,"
            +"path_type                   TEXT,"
            +"entity_id_array             TEXT," // stores array of entities as string to parse
            +"campaign_id                 INTEGER NOT NULL DEFAULT 1,"
            +"FOREIGN KEY(campaign_id)    REFERENCES campaign(campaign_id) ON UPDATE SET NULL ON DELETE SET NULL"
        +");";
    let result = sqlx::query(&qry).execute(&pool).await;
    pool.close().await;
    return result;
}

pub async fn db_init() {
    let db_url = String::from("sqlite://sqlite.db");
    if !Sqlite::database_exists(&db_url).await.unwrap_or(false) {
        Sqlite::create_database(&db_url).await.unwrap();
        match create_schema(&db_url).await {
            Ok(_) => println!("Database created Sucessfully"),
            Err(e) => panic!("{}", e),
        }
    }
}

pub async fn db_insert() {
    let db_url = String::from("sqlite://sqlite.db");
    let instances = SqlitePool::connect(&db_url).await.unwrap();
    // testing some hardcoded dummy values
    let qry ="INSERT INTO campaign (campaign_name, campaign_desc) VALUES('My second campaign', 'Entering Rivendell');".to_owned()
    +"INSERT INTO notes (notes_name, notes_body) VALUES('Note two', 'One ring to rule them all');"
    +"INSERT INTO entity (entity_name, entity_type, entity_immunities) VALUES('Sean Bean', 'Hobbit', 'Poison');"
    +"INSERT INTO path (path_type) VALUES('shop');";
    let result = sqlx::query(&qry).bind("testing").execute(&instances).await;

    instances.close().await;

    println!("{:?}", result);
}
