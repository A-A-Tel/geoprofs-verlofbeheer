import { UserSettings, UserData, Role } from '@/types/index';

export type Auth = {
    user: UserData
    settings: UserSettings
    role: Role
};
