import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function Payment() {
  const [ticket, setTicket] = useState([]);
  let ticketType;
  let ticketPrice;
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const request = axios.get('/tickets');
    request.then(setTicket(request)).catch(() => {
      ticketType = 'nao conectado ao banco';
      ticketPrice = 'sem conexão';
    });
  }, []);

  if(!ticket.data) {
    ticketType = 'nao conectado ao banco';
    ticketPrice = 'sem conexão';
  } else {
    if (ticket.data.TicketType.isRemote === true) {
      ticketType = 'Online';
      ticketPrice = ticket.data.TicketType.price/100;
    } else if (ticket.data.TicketType.isRemote === false) {
      if (ticket.data.TicketType.includesHotel === true) {
        ticketType = 'Presencial + Hotel';
        ticketPrice = ticket.data.TicketType.price/100;
      } else {
        ticketType = 'Presencial';
        ticketPrice = ticket.data.TicketType.price/100;
      }
    }
  }
  
  return (
    <Container>
      <h1>Ingresso e pagamento</h1>
      <div className="ticket_container">
        <h2 className='text_about_options'>Ingresso escolhido</h2>
        <div className="modality_container">
          <div className="ticket">
            <h1>{ticketType}</h1>
            <p>{ticketPrice}</p>
          </div>
        </div>
      </div>

      <PaymentCardContainer>
        <h1>Pagamento</h1>
        <div className='cardInf'>
          <Cards
            style={{ width: '10px' }}
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={'lucas felipe'}
            number={number}
          />
          <div className='cardForm'>
            <input
              type="number" name="input"
              placeholder="Card Number"
              value={number}
              onChange={
                e => setNumber(e.target.value)
              }
            />
            <input
              type="number" name="input"
              placeholder="Card Number"
              value={number}
              onChange={
                e => setNumber(e.target.value)
              }
            />
          </div>
        </div>
        
        <p>testando</p>
      </PaymentCardContainer>
      
    </Container> 
  );
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

  .text_about_options{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #454545;

    margin-top: 37px;

  }

  .ticket{
    margin: 17px 0 30px 0;
    width: 290px;
    height: 108px;
    left: 330px;
    top: 292px;

    background: #FFEED2;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      /* identical to box height */

      text-align: center;

      color: #454545;
    }

    p{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;

      color: #898989;

    }
  }

`;

const PaymentCardContainer = styled.div`
display: flex;
flex-direction: column;

  h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    color: #8E8E8E;

    margin-bottom: 20px;
  }
  .rccs{
    margin-left: 0;
  }
`;
