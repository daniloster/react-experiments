import { createReducerFunction } from 'daniloster-utils';
import createCrudMapStateToProps from './createCrudMapStateToProps';

const STANDARD_NAME = 'dropdownContainer';
export const INITIAL_STATE = {};
export const SUBSECTION_INITIAL_STATE = {
  isLoaded: false,
  item: null,
  items: [],
};

export const fixedConstants = {
  SAVE: `${STANDARD_NAME}:SAVE`,
  LIST: `${STANDARD_NAME}:LIST`,
  REMOVE: `${STANDARD_NAME}:REMOVE`,
  EDIT: `${STANDARD_NAME}:EDIT`,
};

function getSubSection(state = {}, entryType) {
  return state[entryType] || SUBSECTION_INITIAL_STATE;
}

function mergeSubSection(state = {}, entryType, candidateState) {
  if (!candidateState || !Object.keys(candidateState).length) {
    return undefined;
  }

  const subSection = getSubSection(state, entryType);

  return {
    ...state,
    [entryType]: {
      ...subSection,
      ...candidateState,
    },
  };
}

/**
 * Creates a namespaced actions, reducers to connect to the components without conflicts
 * @param {string} namespace - name based on to reserve a section in the redux store
 * @param {object} initialState - initial values for the store section
 */
export default function createCrudReduxSection(namespace, initialState = INITIAL_STATE) {
  const constants = {
    ...fixedConstants,
    REMOVE_ITEMS: `${namespace}:${STANDARD_NAME}:REMOVE_ITEMS`,
    SET_ITEM: `${namespace}:${STANDARD_NAME}:SET_ITEM`,
    SET_ITEMS: `${namespace}:${STANDARD_NAME}:SET_ITEMS`,
    SET_LOADED: `${namespace}:${STANDARD_NAME}:SET_LOADED`,
    SET_VALUE: `${namespace}:${STANDARD_NAME}:SET_VALUE`,
    UPDATE_ITEMS: `${namespace}:${STANDARD_NAME}:UPDATE_ITEMS`,
  };

  /**
   * Set value as property of an item
   */
  function setValue(entryType, propertyName, value) {
    return {
      type: constants.SET_VALUE,
      entryType,
      propertyName,
      value,
    };
  }

  function setValueReducer(state, { entryType, propertyName, value }) {
    const { item = {} } = getSubSection(state, entryType);
    return mergeSubSection(state, entryType, {
      item: {
        ...item,
        [propertyName]: value,
      },
    });
  }

  /**
   * Set isLoaded value
   */
  function setLoaded(entryType, isLoaded) {
    return {
      type: constants.SET_LOADED,
      entryType,
      isLoaded: !!isLoaded,
    };
  }

  function setLoadedReducer(state, { isLoaded, entryType }) {
    return mergeSubSection(state, entryType, {
      isLoaded,
    });
  }

  /**
   * Setting item as the current editting
   * @param {object} item - it will be the current item
   */
  function setItem(entryType, item) {
    return {
      type: constants.SET_ITEM,
      entryType,
      item,
    };
  }

  function setItemReducer(state, { item, entryType }) {
    return mergeSubSection(state, entryType, {
      item: item
        ? {
          ...item,
        }
        : null,
    });
  }

  /**
   * Setting the list of items
   * @param {array} items - list of items
   */
  function setItems(entryType, items = []) {
    return {
      type: constants.SET_ITEMS,
      entryType,
      items,
    };
  }

  function setItemsReducer(state, { items, entryType }) {
    return mergeSubSection(state, entryType, {
      items,
    });
  }

  /**
   * Removes items from the list
   * @param {array} ids - list of id
   */
  function removeItems(entryType, ids = []) {
    return {
      type: constants.REMOVE_ITEMS,
      entryType,
      ids,
    };
  }

  function removeItemsReducer(state, { ids, entryType }) {
    return mergeSubSection(state, entryType, {
      items: getSubSection(state, entryType).items.filter(({ id }) => !ids.includes(id)),
    });
  }

  /**
   * Removes items from the list
   * @param {object} item - item of the list that will
   * be added or updated
   */
  function updateItems(entryType, item) {
    return {
      type: constants.UPDATE_ITEMS,
      entryType,
      item,
    };
  }

  function updateItemsReducer(state, { item, entryType }) {
    let isUpdated = false;
    return mergeSubSection(state, entryType, {
      items: getSubSection(state, entryType)
        .items.map((currentItem) => {
          if (currentItem.id === item.id) {
            isUpdated = true;

            return {
              ...currentItem,
              ...item,
            };
          }

          return currentItem;
        })
        .concat(isUpdated ? [] : item),
    });
  }

  /**
   * Remove the items based on ids provided
   * @param {string} endpoint - endpoint for one entity
   * @param {string} entryType - type of entity
   */
  function edit(endpoint, entryType) {
    return {
      type: constants.EDIT,
      endpoint,
      entryType,
      setItem,
    };
  }

  /**
   * List the items
   */
  function list(endpoint, entryType) {
    return {
      type: constants.LIST,
      endpoint,
      entryType,
      setItems,
      setLoaded,
    };
  }

  /**
   * Save the item
   * @param {object} item - it is the item to be saved
   */
  function remove(endpoint, entryType) {
    return {
      type: constants.REMOVE,
      endpoint,
      entryType,
      removeItems,
    };
  }

  /**
   * Save the item
   * @param {object} item - it is the item to be saved
   * @param {string} id - it is identifier of the item for update purposes
   */
  function save(endpoint, entryType, item, id) {
    return {
      type: constants.SAVE,
      endpoint,
      entryType,
      item,
      id,
      setItem,
      updateItems,
    };
  }

  const actions = {
    setValue,
    setItem,
    setItems,
    save,
    remove,
    edit,
    list,
  };

  const mapDispatchToProps = {
    onEdit: edit,
    onList: list,
    onRemove: remove,
    onSave: save,
    removeItems,
    setItem,
    setItems,
    setLoaded,
    setValue,
    updateItems,
  };

  const reducersMap = {
    [constants.REMOVE_ITEMS]: removeItemsReducer,
    [constants.SET_ITEM]: setItemReducer,
    [constants.SET_ITEMS]: setItemsReducer,
    [constants.SET_LOADED]: setLoadedReducer,
    [constants.SET_VALUE]: setValueReducer,
    [constants.UPDATE_ITEMS]: updateItemsReducer,
  };

  const mapStateToProps = createCrudMapStateToProps(namespace);

  return {
    initialState,
    constants,
    actions,
    mapStateToProps,
    mapDispatchToProps,
    reducersMap,
    reducers: {
      [namespace]: createReducerFunction(initialState, reducersMap),
    },
  };
}
