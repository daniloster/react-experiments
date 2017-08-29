function createReducerFunction(initialState, reducersMap) {
  return (state = initialState, action = {}) => {
    const reducer = reducersMap[action.type] || (() => state);
    const proposedState = reducer(state, action);
    if (proposedState && proposedState !== state && Object.keys(proposedState).length) {
      return {
        ...state,
        ...proposedState,
      };
    }
    return state;
  };
}

export default createReducerFunction;
