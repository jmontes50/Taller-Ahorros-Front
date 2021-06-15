import {Route} from "react-router-dom"
import LoginView from "./Views/LoginView"
import RegisterView from "./Views/RegisterView"
import DashboardView from "./Views/DashboardView"
import PrivateRoute from "./components/PrivateRoute"
function Routes() {
  return (
    <div>
      <Route path='/' exact component={LoginView} /> 
      <Route path='/register' exact component={RegisterView} /> 
      <PrivateRoute path='/dashboard' exact component={DashboardView} /> 
    </div>
  )
}

export default Routes

