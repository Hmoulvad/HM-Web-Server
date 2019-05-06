export interface IUser {
    username: string;
    password: string;
    ref?: string;
    role: Role;
}

export interface IUnit {
    name: string;
    projects: IProject[];
    developers: IDeveloper[];
    unitManager: IUnitManager;
    projectManagers: IProjectManager[];
}

export interface IProject {
    name: string;
    unit: IUnit;
    projectManager: IProjectManager;
    developers: IDeveloper[];
}

export enum Role {
    unitManager = "UnitManager",
    projectManager = "ProjectManager",
    developer = "Developer",
}

export interface IEmployee {
    name: string;
    holidayRequests?: IHolidayRequest[];
    ref?: string;
}

export interface IUnitEmployee extends IEmployee {
    unit: IUnit;
}

export interface IDeveloper extends IUnitEmployee {
    projects: IProject[];
}

export interface IUnitManager extends IUnitEmployee { }

export interface IProjectManager extends IUnitEmployee {
    projects: IProject[];
}

export interface IHolidayRequest {
    unitManagerRef: string | undefined;
    unitManagerApproval: boolean | undefined;
    ref: string;
    refApproval: boolean | undefined;
    dates: Date[];
}


