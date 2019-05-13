import * as React from 'react';
import LayoutContainer from '../../layout';
import AddRequest from './add-request';

const AddHolidayRequest: React.FC<any> = ({}) => {
    const className = "add-holiday-request";
    return (
        <LayoutContainer>
            <div className={`${className}`}>
                <div className={`${className}__wrapper`}>
                    <div className={`${className}__header`}>
                        <h5 className={`${className}__title`}>Add Holiday Request</h5>
                        <p className={`${className}__description`}>Get an overview of all your holiday requests and add a new if needed</p>
                    </div>
                </div>
                <AddRequest />
            </div>
        </LayoutContainer>
    );
}

export default AddHolidayRequest;
