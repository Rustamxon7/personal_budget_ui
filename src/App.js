import {
  HashRouter as Router, Route, Routes
} from 'react-router-dom';
import Home from './pages/home/Home';
import SignUp from './pages/registrations/SignUp';
import LogIn from './pages/registrations/LogIn';
import CreatePerson from './pages/people/CreatePerson';
import EditPerson from './pages/people/EditPerson';
import EditCurrentUser from './pages/user/EditUser';
import PersonInfo from './pages/people/Person';
import CreateCategory from './pages/categories/CreateCategory';
import UpdateCategory from './pages/categories/UpdateCategory';
import Category from './pages/categories/Category';
import Auth, { AuthRoute } from './components/Auth';

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route
        path="/"
        element={(
          <Auth>
            <Home />
          </Auth>
        )}
      />
      <Route
        path="/create-category"
        element={(
          <Auth>
            <CreateCategory />
          </Auth>
        )}
      />
      <Route
        path="/people/:id/create-category"
        element={(
          <Auth>
            <CreateCategory />
          </Auth>
        )}
      />
      <Route
        path="/categories/:id/edit"
        element={(
          <Auth>
            <UpdateCategory />
          </Auth>
        )}
      />
      <Route
        path="/categories/:id"
        element={(
          <Auth>
            <Category />
          </Auth>
        )}
      />
      <Route
        path="/create_person"
        element={(
          <Auth>
            <CreatePerson />
          </Auth>
        )}
      />
      <Route
        path="/people/:id"
        element={(
          <Auth>
            <PersonInfo />
          </Auth>
        )}
      />
      <Route
        path="/people/:id/edit"
        element={(
          <Auth>
            <EditPerson />
          </Auth>
        )}
      />
      <Route
        path="/users/login"
        element={(
          <AuthRoute>
            <LogIn />
          </AuthRoute>
        )}
      />
      <Route
        path="/user/edit"
        element={(
          <Auth>
            <EditCurrentUser />
          </Auth>
        )}
      />
      <Route
        path="/users/signup"
        element={(
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        )}
      />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </Router>
);

export default App;
