export type Operator = "=" | "<>" | "!=" | "<" | ">" | "<=" | ">=";
export type SqliteOper = Operator | "IN" | "LIKE" | "BETWEEN";
export type SqlOrder = "DESC" | "ASC";
export type SqlOrderBy = [string, SqlOrder][];
