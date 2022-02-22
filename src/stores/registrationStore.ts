import { makeAutoObservable } from 'mobx';
import { RegistrationService } from '../services';
import IUser from '../types/IUser';
import openNotificationWithIcon from '../utils/notificationWorker';

function hasKey<T, K extends keyof T>(
    obj: Partial<T>,
    key: K,
): obj is Partial<T> & { [k in K]: T[k] } {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

export default class RegistrationStore {
    private registrationService: typeof RegistrationService;

    userData: Partial<IUser> = {};

    error: any;

    constructor() {
        this.registrationService = RegistrationService;
        makeAutoObservable(this);
    }

    updateUserData(property: string, value: any): void {
        this.userData = { ...this.userData, [property]: value };
    }

    async registerUser(): Promise<void> {
        if (this.isUserDataHasAllFields) {
            const newUser = await this.registrationService.registerUser(
                this.userData as IUser,
            );
            openNotificationWithIcon(
                'success',
                'User created',
                `New user with name ${newUser.name} has been created`,
            );
        } else {
            openNotificationWithIcon(
                'error',
                'User is empty',
                'Please fill all fields',
            );
        }
    }

    get isUserDataHasAllFields(): boolean {
        const hasName = hasKey(this.userData, 'name');
        const hasEmail = hasKey(this.userData, 'email');
        const hasPassword = hasKey(this.userData, 'password');
        const hasBirthDay = hasKey(this.userData, 'birthDay');
        return hasName && hasEmail && hasPassword && hasBirthDay;
    }
}
