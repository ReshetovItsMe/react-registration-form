/**
 * Import all your stores
 */
import RegistrationStore from './registrationStore';
/**
 * Root Store Class with
 */
export class RootStore {
    registrationStore: RegistrationStore;

    constructor() {
        this.registrationStore = new RegistrationStore();
    }
}
