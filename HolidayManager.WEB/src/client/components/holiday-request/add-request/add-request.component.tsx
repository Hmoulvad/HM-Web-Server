import * as React from 'react';
import Helmet from 'react-helmet';
import * as DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

interface IAddRequestProsp {
}

interface IState {
    from: Date;
    to: Date;
}

const AddRequest: React.FunctionComponent<IAddRequestProsp> = (props) => {
    const className = "add-request";
    const initialState: IState = {
        from: new Date,
        to: new Date,
    };
    const numberOfMonths = 2;
    const [ state, setState ] = React.useState<IState>(initialState);
    console.log(state);

    const handleDayClick = (date: Date) => {
        const range = DayPicker.default.DateUtils.addDayToRange(date, state);
        setState(range);
    }

    const handleResetClick = () => {
        setState(initialState);
    }
    const { from, to } = state;
    const modifiers = { start: from, end: to};
    return (
        <div className="RangeExample">
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
          <Helmet>
            <style>{`
                .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                background-color: #f0f8ff !important;
                color: #4a90e2;
                }
                .Selectable .DayPicker-Day {
                border-radius: 0 !important;
                }
                .Selectable .DayPicker-Day--start {
                border-top-left-radius: 50% !important;
                border-bottom-left-radius: 50% !important;
                }
                .Selectable .DayPicker-Day--end {
                border-top-right-radius: 50% !important;
                border-bottom-right-radius: 50% !important;
                }
            `}</style>
          </Helmet>
        </div>
      );
};

export default AddRequest;