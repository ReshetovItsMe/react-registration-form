import React, { useCallback, useMemo, useState } from 'react';
import { Button, Form, Steps } from 'antd';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import AuthStep from './components/AuthStep';
import PersonalDataStep from './components/PersonalDataStep';
import FinalStep from './components/FinalStep';
import useStores from '../../hooks/useStores';
import { CONFIRM_PASSWORD_FIELD_ID } from './components/AuthStep/AuthStep';

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
            if (!(property === CONFIRM_PASSWORD_FIELD_ID)) {
                const value: any = changedValues[property];
                registrationStore.updateUserData(property, value);
            }
        },
        [registrationStore],
    );
    const onSubmit = useCallback(() => {
        registrationStore.registerUser();
    }, [registrationStore]);

    return (
        <Layout>
            <Container>
                <StyledSteps
                    type="navigation"
                    size="small"
                    current={currentStep}
                >
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
                                disabled={
                                    isLastStep ||
                                    !registrationStore.isFieldsValidated
                                }
                                type="primary"
                                onClick={next}
                            >
                                Next
                            </Button>
                        </NavButtonsContainer>

                        {isLastStep && (
                            <Button
                                disabled={!registrationStore.isFieldsValidated}
                                type="primary"
                                htmlType="submit"
                            >
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
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #fff;
    color: #fff;
    padding: 35px 15px 10px 15px;
    min-width: 500px;
    width: 30%;
`;

const StyledSteps = styled(Steps)`
    padding-top: 0;
    margin-bottom: 15px;
`;

const ButtonsContainer = styled(Form.Item)`
    margin-top: 15px;
    margin-bottom: 0;
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
