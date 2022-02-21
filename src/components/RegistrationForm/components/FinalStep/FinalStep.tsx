import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../hooks/useStores';

const FinalStep = () => {
    const { registrationStore } = useStores();
    const { userData } = registrationStore;
    return (
        <Container>
            <ItemContainer>
                <p>Name:</p>
                <p>{userData.name}</p>
            </ItemContainer>
            <ItemContainer>
                <p>Email:</p>
                <p>{userData.email}</p>
            </ItemContainer>
            <ItemContainer>
                <p>Birth day:</p>
                <p>{userData.birthDay}</p>
            </ItemContainer>
            <ItemContainer>
                <p>Additional Information:</p>
                <p>{userData.additionalInfo}</p>
            </ItemContainer>
        </Container>
    );
};

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ItemContainer = styled.div`
    display: flex;
`;

export default observer(FinalStep);
