import { createReducerFunction } from 'daniloster-utils';
import createCrudMapStateToProps from './createCrudMapStateToProps';

const STANDARD_NAME = 'items';
export const INITIAL_STATE = {
  isLoaded: false,
  item: {},
  items: [],
};

export const fixedConstants = {
  SAVE: `${STANDARD_NAME}:SAVE`,
  LIST: `${STANDARD_NAME}:LIST`,
  REMOVE: `${STANDARD_NAME}:REMOVE`,
  EDIT: `${STANDARD_NAME}:EDIT`,
};

/**
 * Creates a namespaced actions, reducers to connect to the components without conflicts
 * @param {string} getEndpoint - method to create endpoint based on { id, ids, method }
 * @param {string} namespace - name based on to reserve a section in the redux store
 * @param {object} initialState - initial values for the store section
 */
export default function createCrudReduxSection(
  getEndpoint,
  namespace,
  initialState = { ...INITIAL_STATE },
) {
  const constants = {
    ...fixedConstants,
    REMOVE_ITEMS: `${namespace}:${STANDARD_NAME}:REMOVE_ITEMS`,
    RESET_VALUES: `${namespace}:${STANDARD_NAME}:RESET_VALUES`,
    SET_ITEM: `${namespace}:${STANDARD_NAME}:SET_ITEM`,
    SET_ITEMS: `${namespace}:${STANDARD_NAME}:SET_ITEMS`,
    SET_LOADED: `${namespace}:${STANDARD_NAME}:SET_LOADED`,
    SET_VALUE: `${namespace}:${STANDARD_NAME}:SET_VALUE`,
    UPDATE_ITEMS: `${namespace}:${STANDARD_NAME}:UPDATE_ITEMS`,
  };

  /**
   * Set value as property of an item
   */
  function setValue(propertyName, value) {
    return {
      type: constants.SET_VALUE,
      propertyName,
      value,
    };
  }

  function setValueReducer({ item }, { propertyName, value }) {
    return {
      item: {
        ...item,
        [propertyName]: value,
      },
    };
  }

  /**
   * Set isLoaded value
   */
  function setLoaded(isLoaded) {
    return {
      type: constants.SET_LOADED,
      isLoaded: !!isLoaded,
    };
  }

  function setLoadedReducer(state, { isLoaded }) {
    return {
      isLoaded,
    };
  }

  /**
   * Reset values for current item
   */
  function resetValues() {
    return {
      type: constants.RESET_VALUES,
    };
  }

  function resetValuesReducer({}, {}) {
    return {
      item: {},
    };
  }

  /**
   * Setting item as the current editting
   * @param {object} item - it will be the current item
   */
  function setItem(item) {
    return {
      type: constants.SET_ITEM,
      item,
    };
  }

  function setItemReducer({}, { item }) {
    return {
      item: {
        ...item,
      },
    };
  }

  /**
   * Setting the list of items
   * @param {array} items - list of items
   */
  function setItems(items = []) {
    return {
      type: constants.SET_ITEMS,
      items,
    };
  }

  function setItemsReducer({}, { items }) {
    return {
      items,
    };
  }

  /**
   * Removes items from the list
   * @param {array} ids - list of id
   */
  function removeItems(ids = []) {
    return {
      type: constants.REMOVE_ITEMS,
      ids,
    };
  }

  function removeItemsReducer({ items }, { ids }) {
    return {
      items: items.filter(({ id }) => !ids.includes(id)),
    };
  }

  /**
   * Removes items from the list
   * @param {object} item - item of the list that will
   * be added or updated
   */
  function updateItems(item) {
    return {
      type: constants.UPDATE_ITEMS,
      item,
    };
  }

  function updateItemsReducer({ items }, { item }) {
    let isUpdated = false;
    return {
      items: items.map(currentItem => {
        if (currentItem.id === item.id) {
          isUpdated = true;

          return {
            ...currentItem,
            ...item,
          };
        }

        return currentItem;
      }).concat(isUpdated ? [] : item),
    };
  }

  /**
   * Remove the items based on ids provided
   * @param {string} id - item identifier
   */
  function edit(baseUrl, id) {
    return {
      type: constants.EDIT,
      setItem,
      baseUrl,
      endpoint: getEndpoint({ id, method: 'get' }),
      id,
    };
  }

  /**
   * List the items
   */
  function list(baseUrl) {
    return {
      type: constants.LIST,
      baseUrl,
      endpoint: getEndpoint({ method: 'get' }),
      setItems,
      setLoaded,
    };
  }

  /**
   * Remove the item
   * @param {object} item - it is the item to be removed
   */
  function remove(baseUrl, ids) {
    return {
      type: constants.REMOVE,
      removeItems,
      baseUrl,
      endpoint: getEndpoint({ ids, method: 'delete' }),
      ids,
    };
  }

  /**
   * Save the item
   * @param {object} item - it is the item to be saved
   * @param {string} id - it is identifier of the item for update purposes
   */
  function save(baseUrl, item, id) {
    return {
      type: constants.SAVE,
      setItem,
      updateItems,
      baseUrl,
      endpoint: getEndpoint({ id, method: id ? 'put' : 'post' }),
      item,
      id,
    };
  }

  const actions = {
    setValue,
    resetValues,
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
    resetValues,
    setItem,
    setItems,
    setLoaded,
    setValue,
    updateItems,
  };

  const reducersMap = {
    [constants.REMOVE_ITEMS]: removeItemsReducer,
    [constants.RESET_VALUES]: resetValuesReducer,
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

