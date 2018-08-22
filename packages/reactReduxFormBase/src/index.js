import { combineValidations } from './formUtils';
import Model from './Model';
import FormState from './FormState';
import FormStateItem from './FormStateItem';
import createReduxStoreSection from './createReduxStoreSection';
import createConnectedComponent from './createReduxStoreSectionAndConnectedComponent';

const createReduxStoreSectionAndConnectedComponent = createConnectedComponent;

export { combineValidations };
export { createReduxStoreSectionAndConnectedComponent };
export { createReduxStoreSection };
export { Model };
export { FormState };
export { FormStateItem };

export default createReduxStoreSectionAndConnectedComponent;
