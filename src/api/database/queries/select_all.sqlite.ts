import { SqlOrderBy } from "../../model";
import { orderBy } from "../databaseUtils";

export default (table: string, sort?: SqlOrderBy) =>
  `SELECT * FROM ${table} ${orderBy(sort)};`;
