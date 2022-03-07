// empty object check
// src: https://stackoverflow.com/a/32108184/13007073
export const isObjEmpty: (obj: object | any) => boolean = (obj) => {
  return (
    obj && // null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
