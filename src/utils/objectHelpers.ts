export const updateObjectinArray = (
  items: any,
  itemId: any,
  objPropName: any,
  newObjProps: any
) => {
  return items.map((u: any) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};

export default updateObjectinArray;
