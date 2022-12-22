import styled from 'styled-components';

export const TicketButton = styled.button`
    border: ${({ selected }) => selected ? 'none' : '1px solid rgba(206, 206, 206, 1)'};
    background-color: ${({ selected }) => selected ? 'rgba(255, 238, 210, 1)' : 'inherit'};
    width: 145px;
    height: 145px;
    border-radius: 20px;
    margin-right: 24px;
    cursor: pointer;

    p {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 16px;
    }

    span {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        color: #898989;
        margin-top: 3px;
    }
`;
