import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SaveToken from "./pages/SaveToken"
import jwt from 'jsonwebtoken'
import NoMatch from "./pages/NoMatch"
import Profile from "./pages/Profile"


const App = () => {
    const [user, setUser] = useState(null)

    // 'Login' the user from JWT if it exists in localStorage
    useEffect(() => {
        const token = localStorage.getItem('jwt')
        try { 
            if(token) {
                const user = jwt.decode(token)
                // console.log('Ther user from token', user)
                setUser(user)
            }
        } catch(err) {
            // console.log(err)
            console.log('the token is expired!')
            handleLogout()
        }
    }, [])

    const handleLogout = () => {
        console.log("Logging out...")
        if(localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt')
        }
        setUser(null)
    }

    return (
        <Router>
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login user={user} />
                    </Route>
                    <Route path="/saveToken">
                        <SaveToken setUser={setUser} />
                    </Route>
                    <Route>
                        <Profile user={user} handleLogout={handleLogout} />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App