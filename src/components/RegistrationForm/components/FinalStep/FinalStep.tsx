import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../hooks/useStores';

const FinalStep = () => {
    const { registrationStore } = useStores();
    const { userData } = registrationStore;
    return (
        <Container>
            <tbody>
                <ItemContainer>
                    <ItemHeader>Name:</ItemHeader>
                    <td>{userData.name}</td>
                </ItemContainer>
                <ItemContainer>
                    <ItemHeader>Email:</ItemHeader>
                    <td>{userData.email}</td>
                </ItemContainer>
                <ItemContainer>
                    <ItemHeader>Birth day:</ItemHeader>
                    <td></td>
                </ItemContainer>
                <ItemContainer>
                    <ItemHeader>Additional Information:</ItemHeader>
                    <td>
                        {!!userData.additionalInfo
                            ? userData.additionalInfo
                            : '<empty>'}
                    </td>
                </ItemContainer>
            </tbody>
        </Container>
    );
};

const Container = styled.table`
    table-layout: auto;
    width: 100%;
`;

const ItemContainer = styled.tr`
    font-size: 16px;
`;

const ItemHeader = styled.td`
    font-weight: bold;
`;

export default observer(FinalStep);
