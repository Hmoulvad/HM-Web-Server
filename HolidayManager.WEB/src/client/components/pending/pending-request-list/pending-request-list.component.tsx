import * as React from 'react';
import { DocumentNode } from 'graphql';
import { Query } from 'react-apollo';
import { IHolidayRequest, Role } from '../../../models/models';
import { convertUnixToDate, dateDifference } from '../../../helpers/date';
import { holidayStatus } from '../../../helpers/request';
import { AppContext } from '../../../context/appContext';

interface IRequestListProps {
    query: DocumentNode;
    variables: object;
    toggleRequest: any;
    dataType: string;
    className?: string;
}

const PendingRequestList: React.FC<IRequestListProps> = ({query, variables, toggleRequest, dataType, className = "pending-request-list"}): JSX.Element => {
    const { role } = React.useContext(AppContext);

    const renderManagerName = (request: IHolidayRequest): string => {
        let managerString: string = "";
        if ( role === Role.projectManager) {
            managerString = `${request.refName} - ${holidayStatus(request.refApproval)}`
        } else {
            managerString = `${request.unitManagerName} - ${holidayStatus(request.unitManagerApproval)}`
        }
        return managerString;
    }
    return (
      <>
        <div className={`${className}__headlines`}>
            <div className={`${className}__headline`}>Period</div>
            <div className={`${className}__headline_days`}>Days</div>
            <div className={`${className}__headline`}>Requester</div>
            <div className={`${className}__headline`}>{role === Role.projectManager ? "Project Manager" : "Unit Manager"}</div>
        </div>
        <div className={`${className}__requests`}>
            <Query query={query} variables={variables}>
                {({ loading, error, data}) => {
                    if ( loading ) return <p>Loading...</p>;
                    if ( error ) return <p>Error...</p>;
                    if ( data ) return (data[dataType] as IHolidayRequest[]).map((request: IHolidayRequest, index: number) => {
                        return (
                            <div className={`${className}__request`} onClick={() => toggleRequest(data[dataType], index)} key={index}>
                                <p className={`${className}__request-text`}>{convertUnixToDate(request.from).toLocaleDateString()} to {convertUnixToDate(request.to).toLocaleDateString()}</p>
                                <p className={`${className}__request-days`}>{dateDifference(request.from, request.to)}</p>
                                <p className={`${className}__request-text`}>{request.creatorName}</p>
                                <p className={`${className}__request-text`}>{renderManagerName(request)}</p>
                            </div>
                        )
                    })
                }}
            </Query>
        </div>
      </>
    );
}

export default PendingRequestList;

