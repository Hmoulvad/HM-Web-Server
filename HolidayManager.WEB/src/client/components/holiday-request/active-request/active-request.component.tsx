import * as React from 'react';
import { dateDifference, convertUnixToDate } from "../../../helpers/date";
import { Query } from 'react-apollo';
import GraphqlSchema from "../../../graphql";
import { AppContext } from '../../../context/appContext';
import { IHolidayRequest } from '../../../models/models';

const ActiveRequest: React.FunctionComponent<any> = (props) => {
    const className = "active-request";
    const { objectRefId } = React.useContext(AppContext);

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
                <span className={`${className}__request-amount`}></span>
                - Active Holiday Requests at the moment
            </p>
            <div className={`${className}__headlines`}>
                <div className={`${className}__headline`}>Period</div>
                <div className={`${className}__headline`}>Days</div>
                <div className={`${className}__headline`}>Unit Manager</div>
                <div className={`${className}__headline`}>Project Manager</div>
            </div>
            <div className={`${className}__requests`}>
            <Query query={GraphqlSchema.GET_HOLIDAY_REQUESTS} variables={{_id: objectRefId}}>
            {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return <p>{error}</p>;
                if (data) return data.getUserHolidayRequests.map((hR: IHolidayRequest, index: number) => {
                    return (
                        <div className={`${className}__request`} key={index}>
                            <p className={`${className}__request-text`}>{convertUnixToDate(hR.from).toLocaleDateString()} to {convertUnixToDate(hR.to).toLocaleDateString()}</p>
                            <p className={`${className}__request-text`}>{dateDifference(hR.from, hR.to)}</p>
                            <p className={`${className}__request-text`}>{hR.unitManagerName} - {holidayStatus(hR.unitManagerApproval)}</p>
                            {hR.ref ? 
                            <p className={`${className}__request-text`}>{hR.refName} - {holidayStatus(hR.refApproval)}</p> 
                            :  
                            <p className={`${className}__request-text`}>NaN</p>}
                            <button className={`${className}__request-button`}>Edit</button>
                        </div>
                    )
                })
            }}
            </Query>
            </div>
        </div>
)
};

export default ActiveRequest;