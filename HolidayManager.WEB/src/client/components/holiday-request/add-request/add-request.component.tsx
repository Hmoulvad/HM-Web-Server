import * as React from 'react';
import Helmet from 'react-helmet';
import * as DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Mutation } from 'react-apollo';
import GraphqlSchema from "../../../graphql";
import { AppContext } from '../../../context/appContext';
import { Role, IProject, IDeveloper } from '../../../models/models';
import Dropdown from '../../../shared/dropdown/dropdown.component';

interface IAddRequestProps {
}
interface IRangeState {
    from: Date;
    to: Date;
}

const AddRequest: React.FunctionComponent<IAddRequestProps> = (props) => {
    const className = "add-request";
    const initialState: IRangeState = {
        from: new Date,
        to: new Date,
    };
    const numberOfMonths = 2;
    const [ state, setState ] = React.useState<IRangeState>(initialState);
    const { user, objectRefId, role } = React.useContext(AppContext);
    const [ activeProject, setActiveProject ] = React.useState<any | undefined>(undefined);

    React.useEffect(() => {
        setActiveProject((user as IDeveloper).projects[0])
    }, [])

    const handleDayClick = (date: Date) => {
        const range = DayPicker.default.DateUtils.addDayToRange(date, state);
        setState(range);
        console.log(range);
    }

    const handleDropdownChange = (value: string) => {
        const projects = (user as IDeveloper).projects;
        const findProject = projects.find(s => s.projectManager.name === value);
        setActiveProject(findProject);
    }

    function dropdownOptions(): any[] {
        const projects = (user as IDeveloper).projects;
        let options: any[] = [];
        projects.forEach(project => {
            options.push(project.projectManager.name)
        });
        return options;
    }

    const handleResetClick = (): void => {
        setState(initialState);
    }
    const { from, to } = state;
    const modifiers = { start: from, end: to};
    return (
        <div className={`${className}`}>
          <p>
            {!from && !to && 'Please select the first day.'}
            {from && !to && 'Please select the last day.'}
            {from &&
              to && `Selected from ${from.toLocaleDateString()} to${to.toLocaleDateString()}`}{' '}
            {from &&
              to && (
                <button className={`${className}__reset-button`} onClick={handleResetClick}>
                  Reset
                </button>
              )}
          </p>
          <DayPicker.default
            className="Selectable"
            numberOfMonths={numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={handleDayClick}
          />
          <Mutation mutation={GraphqlSchema.ADD_HOLIDAY_REQUEST}>
          {( addHolidayRequest, { error }) => (
            <button className={`${className}__add-button`} onClick={e => {
              e.preventDefault();
              addHolidayRequest({
                variables: {
                    _id: objectRefId,
                    role,
                    projectId: activeProject._id,
                    to,
                    from,
                }
              }).catch( e => {
                  console.log(e.message);
              })
            }}>Add Request</button>
          )}
          </Mutation>
          {role === Role.developer && (
            <Dropdown handleChange={handleDropdownChange} className={`${className}__dropdown`} options={dropdownOptions()}></Dropdown>
          )}
        </div>
      );
};

export default AddRequest;