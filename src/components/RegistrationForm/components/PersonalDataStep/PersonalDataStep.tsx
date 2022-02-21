import React from 'react';
import { DatePicker, Form, Input } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../hooks/useStores';

const MAX_ADDITIONAL_INFO_SYMBOLS = 512;
const PersonalDataStep = () => {
    const { registrationStore } = useStores();
    const { userData } = registrationStore;
    return (
        <>
            <Form.Item
                label="Name"
                name="name"
                initialValue={toJS(userData.name)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your Name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Birth Day"
                name="birthDay"
                initialValue={toJS(userData.birthDay)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your Birth Day!',
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                label="Additional Info"
                name="additionalInfo"
                initialValue={toJS(userData.additionalInfo)}
                rules={[
                    {
                        max: MAX_ADDITIONAL_INFO_SYMBOLS,
                        message: `No more than ${MAX_ADDITIONAL_INFO_SYMBOLS} characters`,
                    },
                ]}
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
