import { Fragment } from 'react/jsx-runtime';
import Logo from '../Logo/Logo'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <Fragment>
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
          <Logo />
          <p
            onClick={() => onRouteChange("signout")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      </Fragment>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          SignIn
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
