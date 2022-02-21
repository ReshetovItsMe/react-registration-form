import { makeAutoObservable } from 'mobx';
import { RegistrationService } from '../services';

export default class RegistrationStore {

    private registrationService: typeof RegistrationService;

    error: any;

    constructor() {
        this.registrationService = RegistrationService;
        makeAutoObservable(this);
    }
}
