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
    id: string;
    name: string;
    holidayRequests: IHolidayRequest[];
    role: Role;
    referenceId: string;
}

export enum Role {
    unitManager = "UnitManager",
    projectManager = "ProjectManager",
    developer = "Developer",
    businessConsultant = "BusinessConsultant",
}

export interface IUnitEmployee extends IEmployee {
    unit: IUnit;
}

export interface IDeveloper extends IUnitEmployee {
    projectManagers: IProjectManager[];
}

export interface IUnitManager extends IUnitEmployee {
    projects: IProject[];
}

export interface IProjectManager extends IUnitEmployee {
    projects: IProject[];
}

export interface IHolidayRequest {
    id: string;
    dates: IDate[];
}

export interface IDate {
    date: string;
}
