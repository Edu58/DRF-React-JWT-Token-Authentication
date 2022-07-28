import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navbar() {

  let { user, logoutUser } = useContext(AuthContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">WebAPP</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="me-auto"></div>

          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            {user ?
              (<>
                <li className="nav-item">
                  <a className="nav-link text-light">Welcome, {user.username}</a>
                </li>
                <li className="nav-item">
                  <a href="" className="nav-link" onClick={logoutUser}>Logout</a>
                </li>
              </>
              ) :
              (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login/">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register/">Register</Link>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;