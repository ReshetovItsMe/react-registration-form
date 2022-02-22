import { makeAutoObservable } from 'mobx';
import { RegistrationService } from '../services';
import IUser from '../types/IUser';

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

    registerUser(): void {
        this.registrationService.registerUser(this.userData as IUser);
    }

    get isUserDataHasAllFields(): boolean {
        const hasName = hasKey(this.userData, 'name');
        const hasEmail = hasKey(this.userData, 'email');
        const hasPassword = hasKey(this.userData, 'password');
        const hasBirthDay = hasKey(this.userData, 'birthDay');
        return hasName && hasEmail && hasPassword && hasBirthDay;
    }
}
