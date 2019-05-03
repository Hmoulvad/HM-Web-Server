import * as React from 'react';
import LayoutContainer from '../../layout';
import AddRequest from './add-request';
import ActiveRequest from './active-request';


const HolidayRequest: React.FunctionComponent<any> = (props) => {
    const [ addRequest, setAddRequest ] = React.useState<boolean>(false);

    const toggleRequest = () => {
        setAddRequest(!addRequest);
    }

    const className = "holiday-request";
    return (
        <LayoutContainer>
            <div className={`${className}`}>
                <div className={`${className}__wrapper`}>
                    <div className={`${className}__header`}>
                        <h5 className={`${className}__title`}>Holiday Request</h5>
                        <p className={`${className}__description`}>Get an overview of all your holiday requests and add a new if needed</p>
                    </div>
                    <button onClick={toggleRequest} className={`${className}__add-request`}>{ !addRequest ? "Add Holiday Request" : "Cancel Request"}</button>
                </div>
                { addRequest && <AddRequest />}
                <ActiveRequest />
            </div>
        </LayoutContainer>
    )
};

export default HolidayRequest;