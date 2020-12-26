// type ObjProps = {
//   [key: string]: any;
// }

export const arrToObj = <T extends { _id?: number }>(arr: T[]) => {
  type prop = {
    [key: number]: T;
  }
  const result: prop = {};
  arr.forEach((item: T) => {
    if (item._id) {
      result[item._id] = item;
    }
  });
  return result;
} 