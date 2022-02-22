import React, { useCallback, useState } from 'react';
import { Form, Input } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../hooks/useStores';

const AuthStep = () => {
    const { registrationStore } = useStores();
    const { userData } = registrationStore;
    const [
        confirmPasswordValidationStatus,
        setConfirmPasswordValidationStatus,
    ] = useState<ValidateStatus>('validating');
    const confirmPasswordHandler = useCallback(
        (event) => {
            const value: string = event.target.value;
            if (value === userData.password) {
                setConfirmPasswordValidationStatus('success');
            } else {
                setConfirmPasswordValidationStatus('error');
            }
        },
        [userData.password],
    );

    return (
        <>
            <Form.Item
                label="Email"
                name="email"
                initialValue={toJS(userData.email)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                    {
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please input correct email',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                initialValue={toJS(userData.password)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Сonfirm password"
                name="confirm_password"
                validateStatus={confirmPasswordValidationStatus}
                rules={[
                    {
                        required: true,
                        message: 'Please confirm password!',
                    },
                ]}
            >
                <Input.Password onChange={confirmPasswordHandler} />
            </Form.Item>
        </>
    );
};

export default observer(AuthStep);
