import { Link, Switch, Route, useHistory } from "react-router-dom";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Home from "./Home";
import MyQuotes from "./MyQuotes";
import Profile from "./Profile";
import Register from "./Register";
import Favourites from "./Favourites";
import MyQuoteAdd from "./MyQuoteAdd";

function Launch() 
{
       debugger;
       const history = useHistory();

    return  (<>
                    <Switch>
                        <ProtectedRoute path="/home" exact
                               component={Home}></ProtectedRoute>
                        <ProtectedRoute path="/my-quotes" exact
                               component={MyQuotes} ></ProtectedRoute>
                        <ProtectedRoute path="/my-quotes-add" exact
                               component={MyQuoteAdd} ></ProtectedRoute>
                        <ProtectedRoute path="/favourites" exact
                               component={Favourites}></ProtectedRoute>
                        <ProtectedRoute path="/profile" exact
                               component={Profile}></ProtectedRoute>
                        <ProtectedRoute path="/" exact
                               component={Home}></ProtectedRoute>
                        <Route path="/login" exact
                               component={Login}></Route>
                        <Route path="/register" exact
                               component={Register}></Route>
                        <Route path="*"
                               component={NotFound}></Route>
                    </Switch>

                    <hr/> 
            </>);
}

export default Launch;