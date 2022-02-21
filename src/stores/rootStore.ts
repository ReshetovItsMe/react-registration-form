/**
 * Import all your stores
 */
import AuthStore from './authStore';
/**
 * Root Store Class with
 */
export class RootStore {

    authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore();
    }
}
