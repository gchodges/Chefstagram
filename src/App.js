import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from './constants/routes.js'
import useAuthListener from "./hooks/use-auth-listener.js";
import UserContext from "./context/user.js";

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup.js'))
const NotFound = lazy(() => import('./pages/notfound.js'))
const Dashboard = lazy(() => import('./pages/dashboard.js'))

const App = () => {
  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<Signup />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route element={<NotFound />} path="*"/>
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
