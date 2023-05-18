import Database, { QueryResult } from "tauri-plugin-sql-api";
import { SqlOrderBy, SqliteOper } from "../model";
import { db_init, migrations } from "./queries";
import {
  saneSqlValue,
  orderBy,
  getColumnsFromObject,
  getInsertValuesFromObjArr,
  getUpdateValuesFromObject,
  getInsertValuesFromObject,
} from "./databaseUtils";

const SQLITE_DB_PATH = "sqlite:PathKit.db";

export const database = Database.load(SQLITE_DB_PATH);

export const initializeDatabase = async () => {
  const db = await database;
  try {
    const initResult = await db.execute(db_init);
    const migrateResult = await db.execute(migrations);
    return { initResult, migrateResult };
  } catch (error) {
    console.error(error);
  }
};

interface ISelectAllOptions {
  sort?: SqlOrderBy;
}

export const selectAllRows = async <T>(
  table: string,
  options: ISelectAllOptions = {}
): Promise<T | undefined> => {
  const { sort } = options;
  const db = await database;
  try {
    const query = `SELECT * FROM ${table} ${orderBy(sort)};`;
    const result = await db.select(query);
    return result as T;
  } catch (error) {
    console.error(error);
  }
};

interface ISelectWhereOptions extends ISelectAllOptions {
  key: string;
  oper: SqliteOper;
  value: (string | number | null) | (string | number | null)[];
  sort?: SqlOrderBy;
}

export const selectRowWhere = async <T>(
  table: string,
  options: ISelectWhereOptions
): Promise<T[] | undefined> => {
  const { key, oper, value, sort } = options;
  const db = await database;
  try {
    let val = value;
    if (Array.isArray(val)) {
      val = val.map((v) => saneSqlValue(v));
      switch (oper) {
        case "BETWEEN":
          // assumes if operator is "BETWEEN", that value's length is 2
          val = val.join(" AND ");
          break;
        case "IN":
          val = `(${val.join(",")})`;
          break;
        default:
          break;
      }
    } else {
      val = saneSqlValue(val);
    }
    const condition = `${key} ${oper} ${val}`;

    const query = `
      SELECT * FROM ${table}
      WHERE ${condition}
      ${orderBy(sort)}
      ;`;

    const result = await db.select(query);
    return result as T[];
  } catch (error) {
    console.error(error);
  }
};

/**
 * Inserts a single row into the provided table.
 * On conflict of `idKey` (default: "id") will update row.
 */
export const insertRow = async <T extends {}>(
  table: string,
  data: T,
  idKey: string = "id"
): Promise<QueryResult | undefined> => {
  const db = await database;
  try {
    const query = `
      INSERT INTO ${table} ${getColumnsFromObject(data)}
      VALUES ${getInsertValuesFromObject(data)}
      ON CONFLICT(${idKey}) DO UPDATE SET ${getUpdateValuesFromObject(data)}
      ;`;

    const result = await db.execute(query);
    return result;
  } catch (error) {
    console.error(error);
  }
};

/** Inserts multiple rows into the provided table. Doesn't handle conflicts. */
export const insertRows = async <T extends {}>(
  table: string,
  data: T[]
): Promise<QueryResult | undefined> => {
  const db = await database;
  try {
    const query = `
      INSERT INTO ${table} ${getColumnsFromObject(data[0])}
      VALUES ${getInsertValuesFromObjArr(data)}
      ;`;

    const result = await db.execute(query);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateRow = async (
  table: string,
  data: any,
  id: string
): Promise<QueryResult | undefined> => {
  const db = await database;
  try {
    // Remove id from data so we don't try to mutate it
    if (data.id) {
      delete data.id;
    }

    const query = `
      UPDATE ${table}
      SET ${getUpdateValuesFromObject(data)}
      WHERE id = ${saneSqlValue(id)}
      ;`;

    const result = await db.execute(query);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateAllRows = async (
  table: string,
  data: any
): Promise<QueryResult | undefined> => {
  const db = await database;
  try {
    // Remove id from data so we don't try to mutate it
    if (data.id) {
      delete data.id;
    }
    const setData = Object.entries(data)
      .map(([key, value]) => `${key} = ${saneSqlValue(value)}`)
      .join(",");

    const query = `
      UPDATE ${table}
      SET ${getUpdateValuesFromObject(data)}
      ;`;

    const result = await db.execute(query);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRow = async (
  table: string,
  whereColumn: string | number = "id",
  whereValue: string | number
): Promise<QueryResult | undefined> => {
  const db = await database;
  try {
    const query = `
      DELETE FROM ${table}
      WHERE ${whereColumn} = ${saneSqlValue(whereValue)}
      ;`;

    const result = await db.execute(query);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const executeWithoutForeignKeyConstraint = async (
  query: () => Promise<QueryResult | undefined>,
  disableForeignKey?: boolean
): Promise<QueryResult | undefined> => {
  const db = await database;
  try {
    if (disableForeignKey) await db.execute("PRAGMA foreign_keys = off;");
    const result = await query();
    if (disableForeignKey) await db.execute("PRAGMA foreign_keys = on;");
    return result;
  } catch (error) {
    console.error(error);
  }
};
