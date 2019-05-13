import * as React from 'react';
import GraphqlSchema from "../../../graphql";
import { AppContext } from '../../../context/appContext';
import { IHolidayRequest } from '../../../models/models';
import client from "../../../apolloClient";
import { DocumentNode } from 'graphql';
import Modal from '../../../shared/modal/modal.component';
import ActiveRequestList from './active-request-list';

const ActiveRequest: React.FunctionComponent<any> = (props) => {
    const className = "active-request";
    const { objectRefId } = React.useContext(AppContext);
    const [ activeRequest, setActiveRequest ] = React.useState<IHolidayRequest | undefined>(undefined);
    const ref = React.createRef<Modal>();

    async function deleteHolidayRequest(data: IHolidayRequest[], index: number): Promise<void> {
        let mutation: DocumentNode = GraphqlSchema.DELETE_HOLIDAY_REQUEST;
        await client.mutate({
            mutation,
            variables: {
                _id: data[index]._id
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
                    <div className={`${className}__modal-response`}>
                        {activeRequest.refName}
                    </div>
                </Modal>
            )}
        </div>
)
};

export default ActiveRequest;