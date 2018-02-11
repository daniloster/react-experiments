export default function createCrudMapStateToProps(storeSection) {
  return ({ [storeSection]: section }) => ({
    ...section
  });
}
