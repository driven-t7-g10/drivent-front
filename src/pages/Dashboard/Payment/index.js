import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Payment() {
  const [presentialCollor, setPresentialCollor] = useState('white');
  const [onlineCollor, setOnlineCollor] = useState('white');
  const [select, setSelect] = useState('');

  console.log(select);

  return (
    <Container>
      <h1>Ingresso e pagamento</h1>
      <div className="ticket_container">
        <h2 className='text_about_options'>Primeiro, escolha sua modalidade de ingresso</h2>
        <div className="modality_container">
          <Ticket_modality_presential
            collor = {presentialCollor}
            onClick={() => { clickInPresential(); }}
          >
            <p>presencial</p>
            <p className='price'>R$ 250</p>
          </Ticket_modality_presential>

          <Ticket_modality_online
            collor={onlineCollor}
            onClick={() => { clickInOnline(); }}
          >
            <p>online</p>
            <p className='price'>R$ 200</p>
          </Ticket_modality_online>
        </div>
        
      </div>
      
    </Container> 
  );

  function clickInOnline() {
    if (onlineCollor === 'white' && presentialCollor === 'white') {
      setOnlineCollor('#FFEED2');
      setSelect('online');
    } else if (onlineCollor === 'white' && presentialCollor !== 'white') {
      setOnlineCollor('#FFEED2');
      setPresentialCollor('white');
      setSelect('online');
    } else if (onlineCollor !== 'white' && presentialCollor === 'white') {
      setOnlineCollor('white');
      setSelect('');
    }
  }

  function clickInPresential() {
    if (onlineCollor === 'white' && presentialCollor === 'white') {
      setPresentialCollor('#FFEED2');
      setSelect('presential');
    } else if (onlineCollor !== 'white' && presentialCollor === 'white') {
      setOnlineCollor('white');
      setPresentialCollor('#FFEED2');
      setSelect('presential');
    } else if (onlineCollor === 'white' && presentialCollor !== 'white') {
      setPresentialCollor('white');
      setSelect('');
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  h1{
    font-family: 'Roboto',sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
  }

  h2{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
  }

  .text_about_options{
      margin: 37px 0 17px 0;
  }

  .ticket_container{
    display: flex;
    flex-direction: column;
  }

  .modality_container{
    display: flex;
  }

`;

const Ticket_modality_presential = styled.div`
  box-sizing: border-box;

  width: 145px;
  height: 145px;

  border: 1px solid #CECECE;
  border-radius: 20px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.collor};

  p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    text-align: center;

    color: #454545;
  }

  .price{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #898989;
    margin-top: 3px;
  }
`;

const Ticket_modality_online = styled.div`
  box-sizing: border-box;

  width: 145px;
  height: 145px;

  border: 1px solid #CECECE;
  border-radius: 20px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.collor};

  .price{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;

    color: #898989;
    margin-top: 3px;
  }

  p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    text-align: center;

    color: #454545;
  }
`;
