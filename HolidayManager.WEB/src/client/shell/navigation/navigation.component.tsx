import * as React from 'react';
import LayoutContainer from '../../layout';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Logo from "../../../assets/icons/menu.svg";

interface INavigationProps {
    mobile: boolean;
}

const Navigation: React.FunctionComponent<INavigationProps> = ({mobile}) => {
const { userIsAuthenticated, setAuth} = React.useContext(UserContext);
const [ isMenuOpen, setIsMenuOpen ] = React.useState<boolean>(false);
const className = mobile ? "navigation--mobile" : "navigation";

const signOut = () => {
    setAuth(false);
    localStorage.removeItem("token");
}

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
}

const Links = () => {
    if ( userIsAuthenticated ) {
        return (
            <React.Fragment>
                <NavLink onClick={toggleMenu} exact={true} activeClassName="link--active" className={`${className}__link`} to="/">Home</NavLink>
                <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/overview">Overview</NavLink>
                <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/holidayrequest">Holiday Request</NavLink>
                <div className={`${className}__link`} onClick={signOut} > Logout </div> 
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <NavLink onClick={toggleMenu} exact={true} activeClassName="link--active" className={`${className}__link`} to="/">Home</NavLink>
                <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/login">Login</NavLink>
            </React.Fragment>
        )
    }
}

    return (
        <LayoutContainer>
            { !mobile ?
                (
                <div className={className}>
                    <NavLink exact={true} className={`${className}__logo`} to="/">IMPACT</NavLink>
                    <div className={`${className}__links`}>
                        <Links />
                    </div>
                </div>
                ) : 
                (
                    <div className={`${className}`}>
                        <img className={`${className}__icon`} src={Logo} onClick={toggleMenu} />
                        <NavLink to="/" className={`${className}__logo`}>IMPACT</NavLink>
                        { isMenuOpen && (
                            <div className={`${className}__menu`}>
                                <div className={`${className}__close`} onClick={toggleMenu}>Luk</div>
                                <div className={`${className}__links`}>
                                    <Links />
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </LayoutContainer>
);
};

export default Navigation;