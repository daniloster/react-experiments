import { connect } from 'react-redux';
import memoize from 'fast-memoize';
import Clients from './Clients';
import ClientView from './ClientView';
import {
  mapDispatchToProps,
} from '../accountRedux';

function mapStateToProps(state, ownProps) {
  const {
    auth,
  } = state;

  return {
    ...auth,
    ...ownProps,
  };
}

const getClient = memoize((clientId, clients) => (
  clients.find(({ id }) => id === clientId)
));

function mapStateToPropsClientView(state, ownProps) {
  const {
    auth: {
      clients = [],
      isUsersLoaded,
    },
  } = state;
  const client = getClient(ownProps.clientId, clients);

  return {
    client,
    isUsersLoaded,
  };
}

const ClientViewContainer = connect(mapStateToPropsClientView, mapDispatchToProps)(ClientView);

export { Clients };
export { ClientView };
export { ClientViewContainer };

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
