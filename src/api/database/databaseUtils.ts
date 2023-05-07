import { SqlOrderBy } from "../model";

export const saneSqlValue = (value: any): string => {
  if (typeof value === "boolean") {
    // Returns "0" or "1" for bools
    return Number(value).toString();
  }
  if (typeof value === "object") {
    return `'${JSON.stringify(value)}'`;
  }
  let val = value;
  if (typeof val === "string") {
    val = val.replaceAll("'", "''");
    return (val = `'${val}'`);
  }
  return val;
};

export const orderBy = (sort?: SqlOrderBy): string => {
  if (!sort) return "";
  let result = "ORDER BY ";
  result = result + sort.map((a) => a.join(" ")).join(", ");
  return result;
};

export const getColumnsFromObject = (obj: Record<string, unknown>): string => {
  const cols = Object.keys(obj).join(",");
  return `(${cols})`;
};

export const getInsertValuesFromObject = (
  obj: Record<string, unknown>
): string => {
  const values = `(${Object.values(obj)
    .map((value) => saneSqlValue(value))
    .join(",")})`;
  return values;
};

export const getInsertValuesFromObjArr = (
  data: Record<string, unknown>[]
): string => {
  const values = data.map((d) => getInsertValuesFromObject(d)).join(",");
  return values;
};

export const getUpdateValuesFromObject = (
  obj: Record<string, unknown>
): string => {
  return Object.entries(obj)
    .map(([key, value]) => `${key} = ${saneSqlValue(value)}`)
    .join(",");
};
