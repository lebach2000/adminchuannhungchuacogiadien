import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import UserList  from '../Users/UserList';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import CreateProduct from '../Create/createProduct';
import TablePizza from '../Tables/PizzaTable/PizzaTable';
import Show from '../Tables/show';
import HomePage from '../Home';
import Edit from '../Tables/edit';
import DrinkTable from '../Tables/DrinkTable/DrinkTable';
import BurgerTable from '../Tables/BurgerTable/BurgerTable';
const App = () => (
  <Router>
    <div>
      <Navigation />
      {/*<Route exact path={ROUTES.LANDING} component={LandingPage} />*/}
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.USER} component={UserList}/>


      <Route path={ROUTES.CREATE} component={CreateProduct}/>
      <Route path={ROUTES.PIZZATABLE} component={TablePizza}/>
      <Route path='/drink-table' component={DrinkTable}/>
      <Route path='/burger-table' component={BurgerTable}/>
      <Route path='/show/:id' component={Show} />
      <Route path='/edit/:id' component={Edit} />

    </div>
  </Router>
);

export default withAuthentication(App);
