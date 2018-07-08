import { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

export default function factoryConsumer(stack) {
  return class Consumer extends Component {
    static propTypes = {
      children: PropTypes.func.isRequired,
    };

    state = {
      version: uuid(),
      consumerId: uuid(),
    };

    componentWillMount() {
      this.syncProvider();
    }

    componentWillUpdate() {
      this.unsubscribe();
      this.syncProvider();
    }

    componentWillUnmount() {
      this.unsubscribe();
      this.provider = null;
    }

    syncProvider = () => {
      const { consumerId } = this.state;
      this.provider = stack[stack.length - 1];
      this.unsubscribe = this.provider.addListener(consumerId, () => {
        this.setState({ version: uuid() });
      });
    };

    render() {
      const { children } = this.props;
      const { value } = this.provider.state;

      return children(value);
    }
  };
}
