import { Component } from 'react';
import PropTypes from 'prop-types';

export default function factoryConsumer(stack) {
  return class Consumer extends Component {
    static propTypes = {
      children: PropTypes.func.isRequired,
    };

    state = {
      value: null,
    };

    componentWillMount() {
      const provider = stack[stack.length - 1];
      this.unsubscribe = provider.addListener((value) => {
        this.setState({ value });
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const { children } = this.props;
      const { value } = this.state;

      return children(value);
    }
  };
}
