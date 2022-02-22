import React, { useCallback, useMemo, useState } from 'react';
import { Button, Form, notification, Steps } from 'antd';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import AuthStep from './components/AuthStep';
import PersonalDataStep from './components/PersonalDataStep';
import FinalStep from './components/FinalStep';
import useStores from '../../hooks/useStores';

const { Step } = Steps;

const stepComponents = [
    {
        title: 'Auth info',
        content: <AuthStep />,
    },
    {
        title: 'Personal Data',
        content: <PersonalDataStep />,
    },
    {
        title: 'Finish',
        content: <FinalStep />,
    },
];

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

const RegistrationForm = () => {
    const { registrationStore } = useStores();
    const [currentStep, setCurrentStep] = useState(0);
    const isLastStep = useMemo(
        () => currentStep === stepComponents.length - 1,
        [currentStep],
    );

    const next = useCallback(() => {
        setCurrentStep(currentStep + 1);
    }, [currentStep]);
    const prev = useCallback(() => {
        setCurrentStep(currentStep - 1);
    }, [currentStep]);
    const onValuesChange = useCallback(
        (changedValues: any) => {
            const property: string = Object.keys(changedValues)[0];
            if (!(property === 'confirm_password')) {
                const value: any = changedValues[property];
                registrationStore.updateUserData(property, value);
            }
        },
        [registrationStore],
    );
    const onSubmit = useCallback(() => {
        if (registrationStore.isUserDataHasAllFields) {
            registrationStore.registerUser();
        } else {
            openNotificationWithIcon(
                'error',
                'User empty',
                'Please fill all fields',
            );
        }
    }, [registrationStore]);

    return (
        <Layout>
            <Container>
                <StyledSteps current={currentStep}>
                    {stepComponents.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </StyledSteps>
                <Form
                    name="basic"
                    onValuesChange={onValuesChange}
                    onFinish={onSubmit}
                    autoComplete="off"
                >
                    {stepComponents[currentStep].content}

                    <ButtonsContainer>
                        <NavButtonsContainer>
                            <Button onClick={prev}>Back</Button>
                            <Button
                                disabled={isLastStep}
                                type="primary"
                                onClick={next}
                            >
                                Next
                            </Button>
                        </NavButtonsContainer>

                        {isLastStep && (
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        )}
                    </ButtonsContainer>
                </Form>
            </Container>
        </Layout>
    );
};

const Layout = styled.div`
    align-items: center;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 10px;
`;

const Container = styled.div`
    background-color: #c5c5c5;
    border-radius: 5px;
    color: #fff;
    padding: 35px 15px 10px 15px;
`;

const StyledSteps = styled(Steps)`
    margin-bottom: 15px;
`;

const ButtonsContainer = styled(Form.Item)`
    margin-top: 5px;
    width: 100%;

    && .ant-form-item-control-input-content {
        display: flex;
        justify-content: space-between;
    }
`;

const NavButtonsContainer = styled.div`
    && :first-child {
        margin-right: 5px;
    }
`;

export default observer(RegistrationForm);
