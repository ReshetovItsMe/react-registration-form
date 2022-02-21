import IUser from '../types/IUser';

export interface IRegistrationService {
    registerUser: (user: IUser) => void;
}

class RegistrationService implements IRegistrationService {
    registerUser(user: IUser) {
        const { name } = user;
        // eslint-disable-next-line no-console
        console.log(`user with name ${name} registered`);
    }
}

const RegistrationServiceInstance = new RegistrationService();

export default RegistrationServiceInstance;
