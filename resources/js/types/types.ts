export enum RoleLevel {
    Employee = 1,
    Manager = 2,
    DepartmentManager = 3,
    OfficeManager = 4,
    Administrator = 5,
}

export type UserData = {
    userId: number;
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
    parent: Role|null
};

export type LeaveType = {
    id: number;
    name: string;
}

export type Leave = {
    id: number;
    type: LeaveType;
    requester: UserData;
    reason: string;
};
export type Status = 'success' | 'failed';
