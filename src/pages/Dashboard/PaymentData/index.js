import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import useToken from '../../../hooks/useToken';

export default function Payment() {
  const [ticket, setTicket] = useState([]);
  let ticketType;
  let ticketPrice;
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [opacity, setOpacity] = useState('1');
  const [hide, setHide] = useState('clear');

  const token = useToken();

  useEffect(() => {
    axios
      .get('/tickets/types', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {setTicket(response.data);});
  }, []);

  console.log('ticket: ', ticket);

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
            cvc={cvv}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
          />
          <div className='cardForm'>
            <input
              type="text" name="input"
              placeholder="Card Number"
              value={number}
              onChange={
                e => setNumber(e.target.value)
              }
            />
            <input
              type="text" name="input"
              placeholder="Name"
              value={name}
              onChange={
                e => setName(e.target.value)
              }
            />
          
            <div className="valid-cvv">
              <input
                type="number"
                className="valid"
                placeholder="Valid Thru"
                value={expiry}

                onChange={
                  e => setExpiry(e.target.value)
                }
              />
              <input
                type="text"
                className="cvv"
                placeholder="CVV"
                value={cvv}
                onChange={
                  e => setCvv(e.target.value)
                }
              />
            </div>
            <p className={`ping ${hide}`} > para finalizar insira os dados corretamente</p>
          </div>
          
        </div>
        
      </PaymentCardContainer>
      <div onClick={sendPayment}>
        <ConfirmPurchase>
          <p>FINALIZAR PAGAMENTO</p>               
        </ConfirmPurchase>
      </div>
      
    </Container> 
  );

  function sendPayment() {
    if (cvv.length === 3 && name.length !== 0 && number.length === 16 && expiry.length === 6) {
      console.log('ok');
    } else {
      setHide('');
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
    margin-right: 25px;
  }
  .cardInf{
    display: flex;
  }
  .cardForm{
    display: flex;
    flex-direction: column;
    height: 182px;
    justify-content: space-between;

    input{
      width: 350px;
      height: 46px;

      border: 1.5px solid #8E8E8E;
      border-radius: 5px;
    }
    .valid-cvv{
      display: flex;
      justify-content: space-between;
      .cvv{
        width: 118px;
      }
      .valid{
        width: 214px;
      }
    }
  }

  .clear{
    display: none;
  }

  .ping{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 14px;

    color: #FD0404;

  }
`;

const ConfirmPurchase = styled.div`
  width: 182px;
  height: 37px;

  margin-top: 45px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #000000;

  :hover {
    cursor: pointer;
  }

`;
