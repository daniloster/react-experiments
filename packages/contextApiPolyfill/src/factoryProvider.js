import { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export default function factoryProvider(stack, initialValue) {
  return class Provider extends Component {
    static propTypes = {
      children: PropTypes.node,
      value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    };

    static defaultProps = {
      children: null,
      value: initialValue,
    };

    state = {
      value: this.props.value,
    };

    componentWillMount() {
      stack.push(this);
    }

    componentDidMount() {
      stack.pop();
    }

    componentWillReceiveProps({ value }) {
      if (this.props.value !== value) {
        this.setState({ value });
        Object.values(this.subscribers).forEach(notify => notify(value));
      }
      stack.push(this);
    }

    componentDidUpdate() {
      stack.pop();
    }

    subscribers = {};

    addListener = (notify) => {
      const id = uuid();
      this.subscribers[id] = notify;
      notify(this.state.value);

      return () => {
        delete this.subscribers[id];
      };
    };

    render() {
      const { children } = this.props;

      return children;
    }
  };
}
