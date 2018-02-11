import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import Welcome from '../Welcome';
import Clients from '../Account/Clients';
import ScheduleTypes from '../ScheduleTypes';
import Items from '../Items';
import Pets from '../Pets';

import styles from './ManagerAppView.scss';

const NavigationMenuItem = ({ children, path }) => (
  <Link to={path} className={styles.navigationMenuItem}>
    {children}
  </Link>
);

NavigationMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

const MENU_ITEMS = [
  {
    children: 'Home',
    path: '/',
    key: 'nav-home',
    Component: Welcome,
  },
  {
    children: 'Clientes',
    path: '/clientes',
    key: 'nav-clients',
    Component: Clients,
  },
  {
    children: 'Tipos de Agendamento',
    path: '/tipos-de-agendamento',
    key: 'nav-schedule-types',
    Component: ScheduleTypes,
  },
  {
    children: 'Itens',
    path: '/itens',
    key: 'nav-items',
    Component: Items,
  },
];
const VIEW_ITEMS = [
  {
    path: '/clientes/:clientId/pets',
    key: 'clientes-animais',
    Component: Pets,
  },
];
export default () => {
  // console.log('ManagerAppView: Updating...');
  // console.log('ManagerAppView: Welcome:', Welcome);
  // console.log('ManagerAppView: Clients:', Clients);
  // console.log('ManagerAppView: ScheduleTypes:', ScheduleTypes);
  // console.log('ManagerAppView: Items:', Items);
  return (
    <div>
      <section className={styles.navigationMenuContainer}>
        {MENU_ITEMS.map(({ children, key, path }) => (
          <NavigationMenuItem key={key} path={path}>{children}</NavigationMenuItem>
        ))}
      </section>
      <section>
        <Switch>
          {MENU_ITEMS.concat(VIEW_ITEMS).map(({ key, path, Component }) => (
            <Route exact key={`container-${key}`} path={path} component={Component} />
          ))}
        </Switch>
      </section>
    </div>
  );
};
