export enum RoleLevel {
    Employee = 1,
    Manager = 2,
    DepartmentManager = 3,
    OfficeManager = 4,
    Administrator = 5,
}

export type UserData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

export type UserSettings = {
    notificationSound: boolean;
};

export type Role = {
    id: RoleLevel;
    name: string;
};

export type Succeeded = 'yes'|'no';
