export interface IHolidayRequest {
    unitManagerRef: string,
    unitManagerApproved: boolean | null | undefined;
    projectManagerRef?: string, 
    projectManagerApproved?: boolean | null | undefined;
    to: Date;
    from: Date;
}

export interface IHolidayRequests {
    holidayRequests: IHolidayRequest[]   
};

const date = new Date;

const HR1: IHolidayRequest = {
    unitManagerRef: "JTN",
    unitManagerApproved: true,
    projectManagerRef: "CLI",
    projectManagerApproved: true,
    to: date,
    from: date
}

const HR2: IHolidayRequest = {
    unitManagerRef: "JTN",
    unitManagerApproved: false,
    to: date,
    from: date
}

const HR3: IHolidayRequest = {
    unitManagerRef: "JTN",
    unitManagerApproved: false,
    projectManagerRef: "CLI",
    projectManagerApproved: false,
    to: date,
    from: date
}

const HR4: IHolidayRequest = {
    unitManagerRef: "JTN",
    unitManagerApproved: undefined,
    projectManagerRef: "CLI",
    projectManagerApproved: undefined,
    to: date,
    from: date
}

export const mockData: IHolidayRequests = {
    holidayRequests: [
        HR1,
        HR2,
        HR3,
        HR4,
    ]
}