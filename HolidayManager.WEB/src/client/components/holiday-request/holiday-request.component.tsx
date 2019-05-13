import * as React from 'react';
import LayoutContainer from '../../layout';
import ActiveRequest from './active-request';

const HolidayRequest: React.FunctionComponent<any> = (props) => {

    const className = "holiday-request";
    return (
        <LayoutContainer>
            <div className={`${className}`}>
                <div className={`${className}__wrapper`}>
                    <div className={`${className}__header`}>
                        <h5 className={`${className}__title`}>Holiday Request</h5>
                        <p className={`${className}__description`}>Get an overview of all your holiday requests and add a new if needed</p>
                    </div>
                </div>
                <ActiveRequest />
            </div>
        </LayoutContainer>
    )
};

export default HolidayRequest;