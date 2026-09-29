import { UserSettings, UserData, Role } from '@/types';

export type Auth = {
    data: UserData
    settings: UserSettings
    role: Role
};
