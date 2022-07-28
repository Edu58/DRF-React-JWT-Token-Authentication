import { useContext } from "react";
import AuthContext from "../context/AuthContext";


function Register() {
    let {registerUser} = useContext(AuthContext)

    return ( 
        <form onSubmit={registerUser} style={{maxWidth: "30rem"}} className="mx-auto mt-5">
            <h2 className="text-center">Register</h2>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" name="username" id="username" required autoComplete="username"/>
                <div id="usernameHelp" className="form-text">We'll never share your username with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="Password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="Password" required autoComplete="current-password"/>
            </div>
            <button type="submit" className="btn btn-success">Register</button>
        </form>
     );
}

export default Register;