import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

/**
 * If
 * Component that wraps other components and conditionally displays them.
 */
class If extends PureComponent {
  render() {
    const { className, expression, then, otherwise } = this.props;
    let node = false;
    if (expression && then) {
      node = then();
    } else if (otherwise) {
      node = otherwise();
    }

    if (typeof node === 'string') {
      return <span className={className}>{node}</span>;
    }

    return node;
  }
}

If.propTypes = {
  /**
   * Outer world class to modify internal styles when it is provided
   * a children as string.
   */
  className: PropTypes.string,
  /**
   * The flag that show/hide the children.
   */
  expression: PropTypes.bool.isRequired,
  /**
   * Node conditionally rendered (else case). Note: this node is wrapped
   * into a span when a string is provided.
   */
  otherwise: PropTypes.func,
  /**
   * Node conditionally rendered (if case). Note: this node is wrapped
   * into a span when a string is provided.
   */
  then: PropTypes.func,
};

If.defaultProps = {
  className: '',
  otherwise: null,
  then: null,
};

export default If;
