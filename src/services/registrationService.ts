import IUser from '../types/IUser';

export interface IRegistrationService {
    registerUser: (user: IUser) => void;
}

class RegistrationService implements IRegistrationService {
    registerUser(user: IUser): Promise<IUser> {
        return new Promise<IUser>((resolve) => {
            resolve(user);
        });
    }
}

const RegistrationServiceInstance = new RegistrationService();

export default RegistrationServiceInstance;
