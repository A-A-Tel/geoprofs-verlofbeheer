import { Role, UserData, UserSettings } from '@/types/index';

export type Auth = {
    user: UserData;
    settings: UserSettings;
    role: Role;
};
