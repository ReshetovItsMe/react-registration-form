import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ErrorPage = () => {
    const onReload = () => {
        window.location.reload();
    };
    return (
        <Layout>
            <Container>
                <p>Ooops! We&apos;ve faced with some error</p>
                <p>Please try reload</p>
                <Button
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={onReload}
                >
                    Reload
                </Button>
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
    align-items: center;
    background-color: #5c5c5c;
    border-radius: 5px;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 15px;
`;

export default ErrorPage;
