import * as React from 'react';
import { Query } from 'react-apollo';
import GraphqlSchema from "../../graphql";
import { AppContext } from '../../context/appContext';
import { IHolidayRequest } from '../../models/models';

interface IPending {
}

const Pending: React.FC<IPending> = (props) => {
  const { objectRefId } = React.useContext(AppContext);
  return (
      <Query query={GraphqlSchema.GET_HOLIDAY_REQUESTS_MANAGER} variables={{_id: objectRefId}}>
       {({ loading, error, data}) => {
                if ( loading ) return <p>Loading...</p>;
                if ( error ) return <p>Error...</p>;
                if ( data ) return (data.getPendingHolidayRequests as IHolidayRequest[]).map((request: IHolidayRequest, index: number) => {
                    return (
                        <div key={index}>
                            <div>{request.refName}</div>
                        </div>
                    )
                })
                
            }}
      </Query>
  )
};

export default Pending;