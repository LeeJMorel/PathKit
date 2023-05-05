import { SqlOrderBy, SqliteOper } from "../../model";
import { saneSqlValue, orderBy } from "../databaseUtils";

export default (
  table: string,
  key: string,
  oper: SqliteOper,
  value: (string | number) | (string | number)[],
  sort?: SqlOrderBy
) => {
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
  return `SELECT * FROM ${table} WHERE ${condition} ${orderBy(sort)};`;
};
