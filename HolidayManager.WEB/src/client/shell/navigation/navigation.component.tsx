import * as React from 'react';
import LayoutContainer from '../../layout';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Media from "react-media";

interface INavigationProps {
}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
const { userIsAuthenticated, setAuth} = React.useContext(UserContext);
const [ isMenuOpen, setIsMenuOpen ] = React.useState<boolean>(false);
const className = "navigation";

const signOut = () => {
    setAuth(false);
    localStorage.removeItem("token");
}

const Links = () => {
    if ( userIsAuthenticated ) {
        return (
            <React.Fragment>
                <Link className={`${className}__link`} to="/">Home</Link>
                <Link className={`${className}__link`} to="/overview">Overview</Link>
                <Link className={`${className}__link`} to="/holidayrequest">Holiday Request</Link>
                <div className={`${className}__link`} onClick={signOut} > Logout </div> 
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Link className={`${className}__link`} to="/">Home</Link>
                <Link className={`${className}__link`} to="/login">Login</Link>
            </React.Fragment>
        )
    }
}

    return (
        <LayoutContainer>
            <Media query="(min-width: 576px)">
            {matches =>
                matches ?
                (
                <div className={className}>
                    <Link className={`${className}__logo`} to="/">IMPACT</Link>
                    <div className={`${className}__links`}>
                        <Links />
                    </div>
                </div>
                ) : 
                (
                    <div className={`${className}--mobile`}>
                        
                    </div>
                )
            }
            </Media>
        </LayoutContainer>
);
};

export default Navigation;