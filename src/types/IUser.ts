import { Moment } from 'moment';

interface IUser {
    name: string;
    email: string;
    password: string;
    birthDay: Moment;
    additionalInfo: string;
}

export default IUser;
