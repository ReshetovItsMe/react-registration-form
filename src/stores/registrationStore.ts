import { makeAutoObservable } from 'mobx';
import { RegistrationService } from '../services';
import IUser from '../types/IUser';

export default class RegistrationStore {
    private registrationService: typeof RegistrationService;

    userData: Partial<IUser> = {};

    validationError: boolean = false;

    error: any;

    constructor() {
        this.registrationService = RegistrationService;
        makeAutoObservable(this);
    }

    updateUserData(property: string, value: any): void {
        this.userData = { ...this.userData, [property]: value };
    }

    setValidationError(value: boolean) {
        this.validationError = value;
    }

    registerUser(): void {
        this.registrationService.registerUser(this.userData as IUser);
    }
}
