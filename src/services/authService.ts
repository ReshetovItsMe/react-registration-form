import axios from 'axios';

export interface IAuthService {
    login(username: string, password: string): Promise<void>;
}

class AuthService implements IAuthService {
    async login(username: string, password: string): Promise<void> {
        const bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('password', password);

        const response = await axios.post<null>(`/login`, bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const { status } = response;

        if (status !== 200) {
            throw new Error('Not authorized');
        }
    }

    async logout(): Promise<number> {
        const { status } = await axios.post<null>(`/logout`);
        return status;
    }
}

const AuthServiceInstance = new AuthService();

export default AuthServiceInstance;
