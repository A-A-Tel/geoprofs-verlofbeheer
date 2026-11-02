export enum RoleLevel {
    Employee = 1,
    Manager = 2,
    DepartmentManager = 3,
    OfficeManager = 4,
    Administrator = 5,
}

export type UserData = {
    user_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
};

export type UserSettings = {
    notification_sound: boolean;
};

export type Role = {
    id: RoleLevel;
    name: string;
    parent: Role | null;
};

export type LeaveType = {
    id: number;
    name: string;
};

export type Leave = {
    id: number;
    type: LeaveType;
    requester: UserData;
    reason: string;
};
export type Status = 'success' | 'failed';
