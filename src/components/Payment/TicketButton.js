import styled from 'styled-components';

export default function TicketButton() {
  return (
    <Wrapper>

    </Wrapper>
  );
}

const Wrapper = styled.button`
    border: ${({ selected }) => selected ? 'none' : '1px solid rgba(206, 206, 206, 1)'};
    background-color: ${({ selected }) => selected ? 'rgba(255, 238, 210, 1)' : ''};
    width: 145px;
    height: 145px;
    border-radius: 20px;
`;
