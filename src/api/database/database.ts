import Database, { QueryResult } from "tauri-plugin-sql-api";
import { SqlOrderBy, SqliteOper } from "../model";
import { db_init, select_all, select_where, migrations } from "./queries";
import {
  saneSqlValue,
  transformFromSqlKeys,
  transformToSqlKeys,
} from "./databaseUtils";

const SQLITE_DB_PATH = "sqlite:PathKit.db";

export const database = Database.load(SQLITE_DB_PATH);

export const initializeDatabase = async () => {
  const db = await database;
  try {
    const initResult = await db.execute(db_init);
    const migrateResult = await db.execute(migrations);
    console.log({ migrateResult, initResult });
    return { initResult, migrateResult };
  } catch (error) {
    console.error(error);
  }
};

interface ISelectAllOptions {
  sort?: SqlOrderBy;
}

export const selectAll = async <T>(
  table: string,
  options: ISelectAllOptions = {}
): Promise<T | void> => {
  const { sort } = options;
  const db = await database;
  try {
    const result = await db.select(select_all(table, sort));
    return transformFromSqlKeys(result) as T;
  } catch (error) {
    console.error(error);
  }
};

interface ISelectWhereOptions extends ISelectAllOptions {
  key: string;
  oper: SqliteOper;
  value: (string | number) | (string | number)[];
  sort?: SqlOrderBy;
}

export const selectWhere = async <T>(
  table: string,
  options: ISelectWhereOptions
): Promise<T | void> => {
  const { key, oper, value, sort } = options;
  const db = await database;
  try {
    const result = await db.select(select_where(table, key, oper, value, sort));
    return transformFromSqlKeys(result) as T;
  } catch (error) {
    console.error(error);
  }
};

export const insert = async <T>(
  table: string,
  data: T[]
): Promise<QueryResult | void> => {
  const db = await database;
  try {
    const transformedData = data.map((d) => transformToSqlKeys(d));
    const columns = Object.keys(transformedData[0]).join(",");
    const values = transformedData.map(
      (d) =>
        `(${Object.values(d)
          .map((value) => saneSqlValue(value))
          .join(",")})`
    );

    const query = `INSERT INTO ${table} (${columns}) VALUES ${values.join(
      ","
    )}`;
    const result = await db.execute(query);
    return result;
  } catch (error) {
    console.error(error);
  }
};
