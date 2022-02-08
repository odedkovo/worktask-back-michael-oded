const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;

import { BugList } from '../pages/bugList.jsx';
import { LoginPage } from '../pages/loginPage.jsx';
import { BugDetails } from '../pages/BugDetails.jsx';
import { BugEdit } from '../pages/BugEdit.jsx';


export function App() {
  return (
    <Router>
      <header className='main-header'>
        <div>bug App</div>
        <div>
          <Link to='/buglist'>link to buglist</Link>
          <Link to='/loginPage'> link to Login page</Link>
        </div>
      </header>
      <div>
        <h1>bug App</h1>
      </div>
      <main>
        <Switch>
          <Route component={BugEdit} path='/bug/edit/:bugId'></Route>
          <Route component={BugDetails} path='/bug/details/:bugId' />
          <Route component={LoginPage} path='/loginPage' />
          <Route component={BugList} path='/' />
        </Switch>
      </main>
    </Router>
  );
}
