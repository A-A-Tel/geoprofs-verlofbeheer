import { Role, UserData, UserSetting } from '@/types/index';

export type Auth = {
    user: UserData;
    settings: UserSetting;
    role: Role;
};
