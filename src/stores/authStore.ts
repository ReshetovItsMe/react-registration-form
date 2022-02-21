import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import { AuthService } from '../services';

export default class AuthStore {
    authorized: boolean = true;

    authorizationInProgress: boolean = false;

    private authService: typeof AuthService;

    error: any;

    constructor() {
        this.authService = AuthService;
        makeAutoObservable(this);
    }

    setAuthorized(value: boolean): void {
        this.authorized = value;
    }

    private setAuthorizationInProgress(value: boolean): void {
        this.authorizationInProgress = value;
    }

    private setError(error: any): void {
        // eslint-disable-next-line no-console
        console.error(error);
        this.error = error;
        toast.error(error.message);
    }

    async login(username: string, password: string): Promise<void> {
        try {
            this.setAuthorizationInProgress(true);
            await this.authService.login(username, password);
            this.setAuthorized(true);
            this.setAuthorizationInProgress(false);
        } catch (error) {
            this.setAuthorizationInProgress(false);
            this.setError(error);
        }
    }

    async logout(): Promise<void> {
        try {
            this.setAuthorizationInProgress(true);
            await this.authService.logout();
            this.setAuthorized(false);
            this.setAuthorizationInProgress(false);
        } catch (error) {
            this.setAuthorizationInProgress(false);
            this.setError(error);
        }
    }
}
