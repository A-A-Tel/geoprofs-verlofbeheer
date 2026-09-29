import { UserSettings, UserData, Role } from '@/types';

export type Auth = {
    user: UserData
    settings: UserSettings
    role: Role
};
