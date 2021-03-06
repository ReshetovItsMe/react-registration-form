import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../hooks/useStores';
import messages from './messages';

export const PASSWORD_FIELD_ID = 'password';
export const CONFIRM_PASSWORD_FIELD_ID = 'confirmation';
export const EMAIL_FIELD_ID = 'email';

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
                name={EMAIL_FIELD_ID}
                help={
                    emailValidationStatus === 'error'
                        ? messages.EMAIL_VALIDATION
                        : undefined
                }
                initialValue={toJS(registrationStore.userData.email)}
                validateStatus={emailValidationStatus}
            >
                <Input onChange={emailHandler} />
            </Form.Item>

            <Form.Item
                label="Password"
                name={PASSWORD_FIELD_ID}
                help={
                    passwordValidationStatus === 'error'
                        ? messages.PASSWORD_VALIDATION
                        : undefined
                }
                validateStatus={passwordValidationStatus}
                initialValue={toJS(registrationStore.userData.password)}
            >
                <Input.Password onChange={passwordHandler} />
            </Form.Item>
            <Form.Item
                label="??onfirm password"
                name={CONFIRM_PASSWORD_FIELD_ID}
                help={
                    confirmPasswordValidationStatus === 'error'
                        ? messages.CONFIRM_PASSWORD
                        : undefined
                }
                validateStatus={confirmPasswordValidationStatus}
                getValueFromEvent={clearOnPrev}
            >
                <Input.Password onChange={confirmPasswordHandler} />
            </Form.Item>
        </>
    );
};

export default observer(AuthStep);
