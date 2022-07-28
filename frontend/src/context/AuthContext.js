import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext()


export default AuthContext;

export const AuthProvider = ({ children }) => {

    let navigate = useNavigate()

    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    )

    let [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
    )

    const loginUser = async (e) => {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        const response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        })

        let data = await response.json()
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        navigate('/')
    }


    const registerUser = async (e) => {
        e.preventDefault()

        const username = e.target.username.value
        let password = e.target.password.value

        const response = await fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        })

        console.log(response)

        if (response.status === 200) {
            navigate('login/')
        } else {
            console.log(response.statusText)
        }
    }


    const refreshAuthTokens = async () => {
        console.log('token updated')
        let refreshToken = JSON.parse(localStorage.getItem('authTokens')).refresh

        const response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'refresh': refreshToken })
        })

        let newToken = await response.json()

        if (response.status === 200) {
            setAuthTokens(newToken)
            setUser(jwt_decode(newToken.access))
            localStorage.setItem('authTokens', JSON.stringify(newToken))
        } else {
            logoutUser()
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }


    useEffect(() => {
        let timeToRefresh = 1000 * 60 * 4 

        let interval = setInterval(() => {
            if (authTokens) {
                refreshAuthTokens()
            }
        }, timeToRefresh)

        return () => clearInterval(interval)

    }, [authTokens])


    let context_data = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={context_data}>
            {children}
        </AuthContext.Provider>
    )
}