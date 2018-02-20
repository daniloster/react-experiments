import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'fast-memoize';
import uuid from 'uuid/v4';

function wrapActionCreators(dispatch, func) {
  return (...args) => dispatch(func(...args));
  /* eslint-disable */
  // return function() {
  //   return dispatch(func(...arguments));
  // };
  /* eslint-enable */
}

const createActionCreators = memoize((dispatch, mapDispatchToProps) => {
  if (typeof mapDispatchToProps === 'function') {
    return mapDispatchToProps(dispatch);
  }

  return Object.keys(mapDispatchToProps).reduce(
    (actionCreators, actionCreatorKey) => ({
      ...actionCreators,
      [actionCreatorKey]: wrapActionCreators(dispatch, mapDispatchToProps[actionCreatorKey]),
    }),
    {},
  );
});

export default function connect(mapStateToProps, mapDispatchToProps = {}) {
  return RawComponent =>
    class ConnectedComponent extends Component {
      static contextTypes = {
        store: PropTypes.shape({
          getState: PropTypes.func,
          dispatch: PropTypes.func,
        }).isRequired,
      };

      componentWillMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(this.tick);
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      tick = () => this.setState({ version: uuid() });

      render() {
        const { store } = this.context;
        const state = mapStateToProps(store.getState());
        const actionCreators = createActionCreators(store.dispatch, mapDispatchToProps);
        return <RawComponent {...state} {...actionCreators} />;
      }
    };
}
