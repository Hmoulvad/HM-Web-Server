interface IUnit {
    id: string;
    projects: IProject[];
    devolopers: IDeveloper[];
    unitManager: IUnitManager;
    projectManagers: IProjectManager[];
}

interface IProject {
    id: string;
    unit: IUnit;
    projectManager: IProjectManager;
    developers: IDeveloper[];
}

interface IEmployee {
    id: string;
    name: string;
    holidayRequests: IHolidayRequest[];
    role: Role;
    referenceId: string;
}

enum Role {
    unitManager = "UnitManager",
    projectManager = "ProjectManager",
    developer = "Developer",
    businessConsultant = "BusinessConsultant",
}

interface IUnitEmployee extends IEmployee {
    unit: IUnit;
}

interface IDeveloper extends IUnitEmployee {
    projectManagers: IProjectManager[];
}

interface IUnitManager extends IUnitEmployee {
    projects: IProject[];
}

interface IProjectManager extends IUnitEmployee {
    projects: IProject[];
}

interface IHolidayRequest {
    id: string;
    dates: IDate[];
}

interface IDate {
    date: string;
}
