import * as React from 'react';
import LayoutContainer from '../../layout';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import Logo from "../../../assets/icons/menu.svg";
import { Role } from '../../models/models';

interface INavigationProps {
    mobile: boolean;
}

const Navigation: React.FunctionComponent<INavigationProps> = ({mobile}) => {
const { isAuth, logout, role} = React.useContext(AppContext);
const [ isMenuOpen, setIsMenuOpen ] = React.useState<boolean>(false);
const className = mobile ? "navigation--mobile" : "navigation";

const signOut = () => {
    logout();
    localStorage.removeItem("token");
}

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
}

const Links = () => {
    if ( isAuth ) {
        return (
            <React.Fragment>
                <NavLink onClick={toggleMenu} exact={true} activeClassName="link--active" className={`${className}__link`} to="/">Home</NavLink>
                <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/overview">Overview</NavLink>
                <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/request">Holiday Request</NavLink>
                {role !== Role.developer && <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/pending">Pending Requests</NavLink>}
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