import { SqlOrderBy } from "../model";
import snakeCase from "lodash.snakecase";
import camelCase from "lodash.camelcase";

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
    if (val.indexOf("'") !== 0) {
      val = "'" + val;
    }
    if (val.indexOf("'") !== val.length - 1) {
      val = val + "'";
    }
  }
  return typeof value === "string" ? `'${value}'` : value.toString();
};

export const orderBy = (sort?: SqlOrderBy): string => {
  if (!sort) return "";
  const result = sort.map((a) => a.join(" ")).join(", ");
  return result;
};

export const transformToSqlKeys = (data: any): any => {
  const newData: any = {};
  Object.entries(data).forEach(([key, value]) => {
    newData[snakeCase(key)] = value;
  });
  return newData;
};

const transformFromSqlKeysObject = (data: any): any => {
  const newData: any = {};

  Object.entries(data).forEach(([key, value]) => {
    newData[camelCase(key)] = value;
  });
  return newData;
};

const transformFromSqlKeysArray = (data: any): any => {
  const newData = data.map((d: any) => {
    const newObj: any = {};
    Object.entries(d).forEach(([key, value]) => {
      const newKey = camelCase(key);
      newObj[newKey] = value;
    });
    return newObj;
  });
  return newData;
};

export const transformFromSqlKeys = (data: any): any => {
  if (Array.isArray(data)) {
    return transformFromSqlKeysArray(data);
  }
  return transformFromSqlKeysObject(data);
};
