import { useEffect } from "react"
import { Redirect } from "react-router"
import axios from 'axios'

const Profile = ({ user, handleLogout }) => {
    useEffect(() => {
        // Example access to the auth-locked route
        async function fetchLockedResource() {
            const url = process.env.REACT_APP_SERVER_URL
            const token = localStorage.getItem('jwt')
            // console.log(token)
            const authHeaders = {
                'Authorization': token
            }
            try {
                const res = await axios.get(`${url}/exampleResource`, { headers: authHeaders })
                const data = res.data
                console.log('This is the auth-locked data', data)
            } catch(err) {
                console.error(err.response.data.msg) // JWT is probably expired
                handleLogout()
            }
        }
        fetchLockedResource()
    }, [handleLogout])

    if(user) {
        return <div>
            <h1>{user.displayName}'s Profile Page!</h1>
            <img src={user.photos[0].value} alt="profile pic"/>
            <p>Logged in from {user.provider}</p>
        </div>
    } else {
        return <Redirect to="/login" />
    }
}

export default Profile