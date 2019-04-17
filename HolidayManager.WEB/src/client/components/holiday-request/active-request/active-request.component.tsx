import * as React from 'react';
import { mockData, IHolidayRequest } from "./active-request.mock";
import { dateDifference } from "../../../helpers/date";

const ActiveRequest: React.FunctionComponent<any> = (props) => {
    const className = "active-request";

    const holidayStatus = (status: boolean | undefined | null) => {
        if ( status === null || status === undefined) {
            return "Pending"
        } else {
            if ( status ) {
                return "Approved"
            } else {
                return "Unapproved"
            }
        }
    }

    return (
        <div className={`${className}`}>
            <h5 className={`${className}__title`}>Active Holiday Requests</h5>
            <p className={`${className}__text`}>
                <span className={`${className}__request-amount`}>{mockData.holidayRequests.length}</span>
                - Active Holiday Requests at the moment
            </p>
            <div className={`${className}__headlines`}>
                <div className={`${className}__headline`}>Period</div>
                <div className={`${className}__headline`}>Days</div>
                <div className={`${className}__headline`}>Unit Manager</div>
                <div className={`${className}__headline`}>Project Manager</div>
            </div>
            <div className={`${className}__requests`}>
                { mockData && mockData.holidayRequests.map((hR: IHolidayRequest, index: number) => {
                    return (
                    <div className={`${className}__request`} key={index}>
                        <p className={`${className}__request-text`}>{hR.from.toLocaleDateString()} to {hR.to.toLocaleDateString()}</p>
                        <p className={`${className}__request-text`}>{dateDifference(hR.from, hR.to)}</p>
                        <p className={`${className}__request-text`}>{hR.unitManagerRef} - {holidayStatus(hR.unitManagerApproved)}</p>
                        {hR.projectManagerRef ? 
                        <p className={`${className}__request-text`}>{hR.projectManagerRef} - {holidayStatus(hR.projectManagerApproved)}</p> 
                        :  
                        <p className={`${className}__request-text`}>NaN</p>}
                        <button className={`${className}__request-button`}>Edit</button>
                    </div>
                    )
                })}
            </div>
        </div>
)
};

export default ActiveRequest;