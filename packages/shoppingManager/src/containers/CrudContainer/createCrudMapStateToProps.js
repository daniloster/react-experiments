function UNDEFINED_INTERCEPTORS() {
  return {};
}

function getSubSection({ [storeSection]: section = {} }) {
  return section[ownProps.entryType] || {};
}

export default function createDropdownMapStateToProps(storeSection) {
  /**
   * ownProps required to have function getEndpoint({ id, ids, method })
   */
  return (state, { interceptors = UNDEFINED_INTERCEPTORS, ...ownProps }) => {
    const subSection = getSubSection(state);
    return {
      ...subSection,
      ...interceptors(section[ownProps.entryType], ownProps),
      ...ownProps,
    };
  };
}
