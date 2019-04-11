import * as React from 'react';
import LayoutContainer from '../../layout';
import { Link } from 'react-router-dom';

interface INavigationProps {
}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {

const className = "navigation";

    return (
        <LayoutContainer>
            <div className={className}>
                <Link className={`${className}__logo`} to="/">IMPACT</Link>
                <div className={`${className}__links`}>
                    <Link className={`${className}__link`} to="/">Home</Link>
                    <Link className={`${className}__link`} to="/overview">Overview</Link>
                    <Link className={`${className}__link`} to="/holidayrequest">Holiday Request</Link>
                    <Link className={`${className}__link`} to="/login">Login</Link>
                </div>
            </div>
        </LayoutContainer>
);
};

export default Navigation;