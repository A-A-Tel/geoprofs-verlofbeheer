import { UserSettings, UserData, Role } from '@/types/types';

export type Auth = {
    data: UserData
    settings: UserSettings
    role: Role
};
