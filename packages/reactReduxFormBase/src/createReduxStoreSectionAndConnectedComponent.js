import { connect } from 'react-redux';
import Model from './Model';
import createReduxStoreSection from './createReduxStoreSection';

/**
 * Creates the redux store section and return a FormItem connected
 * @param {string} namespace
 * @param {string} dataName
 * @param {object} schemaData
 *
 * @returns {object}
 */
export default function createReduxStoreSectionAndConnectedComponent(...args) {
  const storeMetadata = createReduxStoreSection(...args);
  const { mapDispatchToProps, mapStateToProps } = storeMetadata;

  return {
    ...storeMetadata,
    Model: connect(mapStateToProps, mapDispatchToProps)(Model),
  };
}
