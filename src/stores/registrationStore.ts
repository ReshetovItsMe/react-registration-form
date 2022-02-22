import { makeAutoObservable } from 'mobx';
import { RegistrationService } from '../services';
import IUser from '../types/IUser';
import localStorageWorker from '../utils/localStorageWorker';
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

    isFieldsValidated: boolean = false;

    error: any;

    constructor() {
        this.registrationService = RegistrationService;
        makeAutoObservable(this);
    }

    setFieldsValidated(value: boolean): void {
        this.isFieldsValidated = value;
    }

    updateUserData(property: string, value: any): void {
        this.userData = { ...this.userData, [property]: value };
    }

    get isUserDataHasAllFields(): boolean {
        const hasName = hasKey(this.userData, 'name');
        const hasEmail = hasKey(this.userData, 'email');
        const hasPassword = hasKey(this.userData, 'password');
        const hasBirthDay = hasKey(this.userData, 'birthDay');
        return hasName && hasEmail && hasPassword && hasBirthDay;
    }

    async registerUser(): Promise<void> {
        const usersFromStore: IUser[] | undefined =
            localStorageWorker.getFromLS('users');
        const isUserAlreadyExist = usersFromStore?.find(
            (user) => user.email === this.userData.email,
        );
        if (this.isUserDataHasAllFields && !isUserAlreadyExist) {
            const newUser = await this.registrationService.registerUser(
                this.userData as IUser,
            );
            localStorageWorker.setToLS(
                'users',
                usersFromStore ? [...usersFromStore, newUser] : [newUser],
            );
            openNotificationWithIcon(
                'success',
                'User created',
                `New user with name ${newUser.name} has been created`,
            );
        } else {
            const notification = isUserAlreadyExist
                ? {
                      title: 'User alredy registered',
                      message: `User with email ${this.userData.email} already created`,
                  }
                : {
                      title: 'User is empty',
                      message: 'Please fill all fields',
                  };
            openNotificationWithIcon(
                'error',
                notification.message,
                notification.title,
            );
        }
    }
}
