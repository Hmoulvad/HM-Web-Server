import * as React from 'react';
import GraphqlSchema from "../../../graphql";
import { AppContext } from '../../../context/appContext';
import { IHolidayRequest } from '../../../models/models';
import client from "../../../apolloClient";
import { DocumentNode } from 'graphql';
import Modal from '../../../shared/modal/modal.component';
import ActiveRequestList from './active-request-list';
import { convertUnixToDate } from '../../../helpers/date';

const ActiveRequest: React.FunctionComponent<any> = (props) => {
    const className = "active-request";
    const { objectRefId } = React.useContext(AppContext);
    const [ activeRequest, setActiveRequest ] = React.useState<IHolidayRequest | undefined>(undefined);
    const ref = React.createRef<Modal>();

    async function deleteHolidayRequest(): Promise<void> {
        let mutation: DocumentNode = GraphqlSchema.DELETE_HOLIDAY_REQUEST;
        await client.mutate({
            mutation,
            variables: {
                _id: activeRequest!._id
            }
        }).catch(e => {
            console.log(e.message);
        })
    }

    const toggleRequest = (data: IHolidayRequest[], index: number): void => {
        if (!!ref!.current) {
            ref.current.open();
        }
        setActiveRequest(data[index])
    }

    return (
        <div className={`${className}`}>
            <h5 className={`${className}__title`}>Your active holiday requests</h5>
            <ActiveRequestList dataType={"getUserHolidayRequests"} toggleRequest={toggleRequest} query={GraphqlSchema.GET_HOLIDAY_REQUESTS} variables={{_id: objectRefId}} />
            {activeRequest !== undefined && (
                <Modal className={`${className}__modal`} ref={ref}>
                    <div className={`${className}__modal__header`}>Do you wish to delete following Holiday Request?</div>
                    <div className={`${className}__modal__request`}>{convertUnixToDate(activeRequest.from).toDateString()} to {convertUnixToDate(activeRequest.to).toDateString()}</div>
                    <button onClick={deleteHolidayRequest} className={`${className}__modal__button`}>Yes</button>
                </Modal>
            )}
        </div>
)
};

export default ActiveRequest;