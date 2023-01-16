import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

import useToken from '../../../hooks/useToken';

export default function Activities() {
  const token = useToken();
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/payments/ticket',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
      .then((response) => { setPayment(response.data); });
  }, []);

  if (payment.length === 0) return 0;

  console.log(payment);

  if (payment.ticket.status !== 'PAID') {
    return (<Container>
      <h1>Escolha de atividades</h1>
      <div className="no_hotels_container">
        <h2 className='text_about_options'>Você precisa ter confirmado pagamento antes
          de fazer a escolha de atividades</h2>
      </div>
    </Container>);
  }

  if (payment.ticket.TicketType.isRemote === true) {
    return (<Container>
      <h1>Escolha de atividades</h1>
      <div className="no_hotels_container">
        <h2 className='text_about_options'>Sua modalidade de ingresso não necessita escolher
          atividade. Você terá acesso a todas as atividades.</h2>
      </div>
    </Container>);
  }

  return 'Atividades: Em breve!';
}

const Container = styled.div`
 display: flex;
 flex-direction: column;
 height: 100%;

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
  .hotels_container{
   display: flex;
   flex-direction: column;
 }
 .no_hotels_container{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
 }
 .text_about_options{
  text-align: center;
  width: 462px;
  height: 46px;
 }
 .hotels_options_container{
   display: flex;
 }
 .room_container{
  border: 2px solid green;
  display: flex;
  flex-wrap: wrap;
  width: 850px;
 }
 `;
