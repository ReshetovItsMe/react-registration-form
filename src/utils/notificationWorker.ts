import { notification } from 'antd';

const openNotificationWithIcon = (
    type: 'success' | 'error',
    title: string,
    description: string,
) => {
    notification[type]({
        message: title,
        description,
    });
};

export default openNotificationWithIcon;
