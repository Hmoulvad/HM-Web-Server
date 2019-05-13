import * as React from 'react';
import { Query } from 'react-apollo';
import GraphqlSchema from "../../graphql";
import { AppContext } from '../../context/appContext';
import { IHolidayRequest } from '../../models/models';
import LayoutContainer from '../../layout';
import Modal from '../../shared/modal/modal.component';
import PendingRequestList from './pending-request-list';
import { convertUnixToDate } from '../../helpers/date';

const Pending: React.FC<any> = (props) => {
    const { objectRefId } = React.useContext(AppContext);
    const [ activeRequest, setActiveRequest ] = React.useState<any>(undefined);
    const ref = React.createRef<Modal>();

    const toggleRequest = (data: IHolidayRequest[], index: number): void => {
        if (!!ref!.current) {
            ref.current.open();
        }
        setActiveRequest(data[index])
    }

    const className = "pending";
        return (
            <LayoutContainer>
                <div className={`${className}`}>
                    <div className={`${className}__wrapper`}>
                        <div className={`${className}__header`}>
                            <h5 className={`${className}__title`}>Pending Holiday Requests</h5>
                            <p className={`${className}__description`}>Get an overview of pending holiday requests that you can approve</p>
                        </div>
                        <PendingRequestList toggleRequest={toggleRequest} dataType={"getPendingHolidayRequests"} query={GraphqlSchema.GET_HOLIDAY_REQUESTS_MANAGER} variables={{_id: objectRefId}}/>
                        {activeRequest !== undefined && (
                            <Modal className={`${className}__modal`} ref={ref}>
                                <div className={`${className}__modal__header`}>Do you wish to approve or decline following Holiday Request?</div>
                                <div className={`${className}__modal__request`}>{convertUnixToDate(activeRequest.from).toDateString()} to {convertUnixToDate(activeRequest.to).toDateString()}</div>
                                <button className={`${className}__modal__button`}>Yes</button>
                            </Modal>
                        )}
                    </div>
                </div>
            </LayoutContainer>
        )
};

export default Pending;