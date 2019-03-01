export interface IUnit {
    name: string;
    projects: IProject[];
    devolopers: IDeveloper[];
    unitManager: IUnitManager;
    projectManagers: IProjectManager[];
}

export interface IProject {
    name: String;
    unit: IUnit;
    projectManager: IProjectManager;
    developers: IDeveloper[];
}

export interface IEmployee {
    name: string;
    holidayRequests: IHolidayRequest[];
    referenceId: string;
    role: String;
}

export enum Role {
    unitManager = "UnitManager",
    projectManager = "ProjectManager",
    developer = "Developer",
}

export interface IUnitEmployee extends IEmployee {
    unit: IUnit;
}

export interface IDeveloper extends IUnitEmployee {
    projectManagers: IProjectManager[];
}

export interface IUnitManager extends IUnitEmployee { }

export interface IProjectManager extends IUnitEmployee {
    projects: IProject[];
}

export interface IHolidayRequest {
    requestReference: string, 
    dates: Date[];
}


