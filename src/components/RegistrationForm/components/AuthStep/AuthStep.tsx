import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../hooks/useStores';

const AuthStep = () => {
    const { registrationStore } = useStores();
    const [
        confirmPasswordValidationStatus,
        setConfirmPasswordValidationStatus,
    ] = useState<ValidateStatus>('validating');
    const [passwordValidationStatus, setPasswordValidationStatus] =
        useState<ValidateStatus>('validating');
    const [emailValidationStatus, setEmailValidationStatus] =
        useState<ValidateStatus>('validating');

    const checkPassword = useCallback((value: string) => {
        const isNotEmpty: boolean = value.length > 0;
        if (isNotEmpty) {
            setPasswordValidationStatus('success');
        } else {
            setPasswordValidationStatus('error');
        }
    }, []);
    const checkEmail = useCallback((value: string) => {
        const isNotEmpty: boolean = value.length > 0;
        const matchEmailPattern: boolean = !!value.match(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        );
        if (isNotEmpty && matchEmailPattern) {
            setEmailValidationStatus('success');
        } else {
            setEmailValidationStatus('error');
        }
    }, []);
    const confirmPasswordHandler = useCallback(
        (event) => {
            const value: string = event.target.value;
            if (value === registrationStore.userData.password) {
                setConfirmPasswordValidationStatus('success');
            } else {
                setConfirmPasswordValidationStatus('error');
            }
        },
        [registrationStore.userData.password],
    );
    const passwordHandler = useCallback(
        (event) => {
            const value: string = event.target.value;
            checkPassword(value);
        },
        [checkPassword],
    );
    const emailHandler = useCallback(
        (event) => {
            const value: string = event.target.value;
            checkEmail(value);
        },
        [checkEmail],
    );

    useEffect(() => {
        if (!!registrationStore.userData.email) {
            checkEmail(registrationStore.userData.email);
        }
        if (!!registrationStore.userData.password) {
            checkPassword(registrationStore.userData.password);
        }
    }, [
        checkEmail,
        checkPassword,
        registrationStore.userData.email,
        registrationStore.userData.password,
    ]);

    useEffect(() => {
        if (
            confirmPasswordValidationStatus === 'success' &&
            passwordValidationStatus === 'success' &&
            emailValidationStatus === 'success'
        ) {
            registrationStore.setFieldsValidated(true);
        } else {
            registrationStore.setFieldsValidated(false);
        }
        // no need to write the whole store
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        registrationStore.setFieldsValidated,
        confirmPasswordValidationStatus,
        emailValidationStatus,
        passwordValidationStatus,
    ]);

    // WA to clear password confirmation on prev button
    const clearOnPrev = useCallback(() => {}, []);

    return (
        <>
            <Form.Item
                label="Email"
                name="email"
                initialValue={toJS(registrationStore.userData.email)}
                validateStatus={emailValidationStatus}
            >
                <Input onChange={emailHandler} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                validateStatus={passwordValidationStatus}
                initialValue={toJS(registrationStore.userData.password)}
            >
                <Input.Password onChange={passwordHandler} />
            </Form.Item>
            <Form.Item
                label="Сonfirm password"
                name="confirmation"
                validateStatus={confirmPasswordValidationStatus}
                getValueFromEvent={clearOnPrev}
            >
                <Input.Password onChange={confirmPasswordHandler} />
            </Form.Item>
        </>
    );
};

export default observer(AuthStep);
