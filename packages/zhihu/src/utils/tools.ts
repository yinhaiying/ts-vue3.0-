type ObjProps = {
  [key: string]: any;
}

export const arrToObj = (arr: ObjProps[], name: string) => {
  const result: ObjProps = {};
  arr.forEach((item) => {
    result[item[name]] = item;
  });
  return result;
} 