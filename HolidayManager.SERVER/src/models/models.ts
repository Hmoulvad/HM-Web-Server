export interface IUser {
    username: string;
    password: string;
    referenceId?: string;
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
    holidayRequests: IHolidayRequest[];
    referenceId: string;
    role: Role;
}

export interface IUnitEmployee extends IEmployee {
    unit: IUnit;
}

export interface IDeveloper extends IUnitEmployee {
    Projects: IProject[];
}

export interface IUnitManager extends IUnitEmployee { }

export interface IProjectManager extends IUnitEmployee {
    projects: IProject[];
}

export interface IHolidayRequest {
    requestReference: string, 
    dates: Date[];
}


