import React, { useCallback, useEffect, useState } from 'react';
import { DatePicker, Form, Input } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../hooks/useStores';

const MAX_ADDITIONAL_INFO_SYMBOLS = 512;

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
                name="name"
                initialValue={toJS(registrationStore.userData.name)}
                validateStatus={nameValidationStatus}
            >
                <Input onChange={nameHandler} />
            </Form.Item>

            <Form.Item
                label="Birth Day"
                name="birthDay"
                initialValue={toJS(registrationStore.userData.birthDay)}
                validateStatus={birthDayValidationStatus}
            >
                <DatePicker onChange={birthDayHandler} />
            </Form.Item>

            <Form.Item
                label="Additional Info"
                name="additionalInfo"
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
