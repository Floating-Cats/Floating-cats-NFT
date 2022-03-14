export default function OnClickMintNFT(obj: object | any): boolean {
  return (
    obj && // null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}
