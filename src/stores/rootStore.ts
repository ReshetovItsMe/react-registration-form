/**
 * Import all your stores
 */
import AudioStore from './audioStore';
import AuthStore from './authStore';
import ConfigStore from './configStore';
import SessionStore from './sessionStore';
import UserStore from './userStore';

/**
 * Root Store Class with
 */
export class RootStore {
    userStore: UserStore;

    sessionStore: SessionStore;

    audioStore: AudioStore;

    authStore: AuthStore;

    configStore: ConfigStore;

    constructor() {
        this.userStore = new UserStore();
        this.sessionStore = new SessionStore();
        this.authStore = new AuthStore();
        this.audioStore = new AudioStore();
        this.configStore = new ConfigStore();
    }
}
