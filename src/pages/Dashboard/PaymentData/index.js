import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import useToken from '../../../hooks/useToken';

export default function Payment() {
  const [ticket, setTicket] = useState({});
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [hide, setHide] = useState('clear');
  const [issuer, setIssuer] = useState('');
  const [paymentRequest, setPaymentRequest] = useState(true);

  const token = useToken();

  useEffect(() => {
    axios
      .get('http://localhost:4000/tickets', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => { setTicket(response.data); })
      .catch((error) => {
        if (error.response?.status === 404) setTicket(null);
      });
  }, []);

  if (ticket === null) return (
    <NoTicket><p>Você precisa completar sua inscrição antes
    de prosseguir pra escolha de ingresso</p></NoTicket>
  );

  return (
    <Container>
      <h1>Ingresso e pagamento</h1>
      <div className="ticket_container">
        <h2 className='text_about_options'>Ingresso escolhido</h2>
        <div className="modality_container">
          <div className="ticket">
            <h1>{ticket.TicketType?.name}</h1>
            <p>R$ {ticket.TicketType?.price/100}</p>
          </div>
        </div>
      </div>

      <PaymentCardContainer>
        <h1>Pagamento</h1>
        {ticket.status === 'RESERVED' && paymentRequest ? <><div className='cardInf'>
          <Cards
            style={{ width: '10px' }}
            cvc={cvv}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
            callback={handleCallback}
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
        <div onClick={() => sendPayment()}>
          <ConfirmPurchase>
            <p>FINALIZAR PAGAMENTO</p>
          </ConfirmPurchase>
        </div>
        </> : <div className='confirmPayment'><ion-icon name="checkmark-circle"></ion-icon><div className='confirm'><h1>Pagamento confirmado!</h1><h2>Prossiga para escolha de hospedagem e atividades</h2></div></div>}
      </PaymentCardContainer>
    </Container>
  );

  function sendPayment() {
    if (cvv.length === 3 && name.length !== 0 && number.length === 16 && expiry.length === 6) {
      console.log(issuer);
      const body = {
        issuer: issuer,
        number: number,
        name: name,
        expirationDate: `${expiry[0]}${expiry[1]}/${expiry[2]}${expiry[3]}${expiry[4]}${expiry[5]}`,
        cvv: cvv,
      };
      axios
        .post('http://localhost:4000/payments/process', {
          ticketId: ticket.id,
          cardData: body
        }, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }).then((response) => {
          console.log('foi');
          setPaymentRequest(false);
        });
    } else {
      setHide('');
      console.log('eita');
    }
  }

  function handleCallback({ issuer }) {
    setIssuer((issuer).toUpperCase());
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
  .confirmPayment{
    display: flex;
    align-items: center;
    ion-icon{
      color: rgba(54, 184, 83, 1);
      font-size: 41px;
      border-radius: 50%;
    }
  }
  .confirm{
    margin-left: 10px;
    font-weight: 700;
    font-size: 12px;
    line-height: 19px;
    color: #454545;
    h1{
      margin-bottom: 2px;
      font-size: 16px;
    }
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

const NoTicket = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-family: 'Roboto';
    color: rgba(142, 142, 142, 1);
    font-size: 20px;
    width: 388px;
    height: 46px;
    text-align: center;
  }
`;
