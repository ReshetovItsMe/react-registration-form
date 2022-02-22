import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker, Form, Input } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../hooks/useStores';
import messages from './messages';

const MAX_ADDITIONAL_INFO_SYMBOLS = 512;
export const NAME_FIELD_ID = 'password';
export const BIRTH_DAY_FIELD_ID = 'confirmation';
export const ADDITIONAL_INFO_FIELD_ID = 'email';

const PersonalDataStep = () => {
    const { registrationStore } = useStores();
    const [nameValidationStatus, setNameValidationStatus] =
        useState<ValidateStatus>('validating');
    const [birthDayValidationStatus, setBirthDayValidationStatus] =
        useState<ValidateStatus>('validating');

    const checkName = useCallback((value: string) => {
        const isNotEmpty: boolean = value.length > 0;
        if (isNotEmpty) {
            setNameValidationStatus('success');
        } else {
            setNameValidationStatus('error');
        }
    }, []);
    const nameHandler = useCallback(
        (event) => {
            const value: string = event.target.value;
            checkName(value);
        },
        [checkName],
    );
    const birthDayHandler = useCallback((time) => {
        if (time && time.isBefore(new Date())) {
            setBirthDayValidationStatus('success');
        } else {
            setBirthDayValidationStatus('error');
        }
    }, []);

    useEffect(() => {
        if (!!registrationStore.userData.birthDay) {
            birthDayHandler(registrationStore.userData.birthDay);
        }
        if (!!registrationStore.userData.name) {
            checkName(registrationStore.userData.name);
        }
    }, [
        birthDayHandler,
        checkName,
        registrationStore.userData.birthDay,
        registrationStore.userData.name,
    ]);

    useEffect(() => {
        if (
            nameValidationStatus === 'success' &&
            birthDayValidationStatus === 'success'
        ) {
            registrationStore.setFieldsValidated(true);
        } else {
            registrationStore.setFieldsValidated(false);
        }
    }, [birthDayValidationStatus, nameValidationStatus, registrationStore]);

    return (
        <>
            <Form.Item
                label="Name"
                name={NAME_FIELD_ID}
                initialValue={toJS(registrationStore.userData.name)}
                help={
                    nameValidationStatus === 'error'
                        ? messages.NAME_VALIDATION
                        : undefined
                }
                validateStatus={nameValidationStatus}
            >
                <Input onChange={nameHandler} />
            </Form.Item>

            <Form.Item
                label="Birth Day"
                name={BIRTH_DAY_FIELD_ID}
                initialValue={toJS(registrationStore.userData.birthDay)}
                help={
                    birthDayValidationStatus === 'error'
                        ? messages.DATE_VALIDATION
                        : undefined
                }
                validateStatus={birthDayValidationStatus}
            >
                <DatePicker onChange={birthDayHandler} />
            </Form.Item>

            <Form.Item
                label="Additional Info"
                name={ADDITIONAL_INFO_FIELD_ID}
                initialValue={toJS(registrationStore.userData.additionalInfo)}
            >
                <Input.TextArea
                    showCount
                    maxLength={MAX_ADDITIONAL_INFO_SYMBOLS}
                />
            </Form.Item>
        </>
    );
};

export default observer(PersonalDataStep);
