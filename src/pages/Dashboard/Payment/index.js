import styled from 'styled-components';
import { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TicketButton } from '../../../components/Payment/TicketButton';

export default function Payment() {
  const [presentialCollor, setPresentialCollor] = useState('white');
  const [onlineCollor, setOnlineCollor] = useState('white');
  const [select, setSelect] = useState('');
  const [withHotel, setWithHotel] = useState(false);
  const [withoutHotel, setWithoutHotel] = useState(false);

  const navigate = useNavigate();

  const [ticket, setTicket] = useState([]);

  const token = useToken();

  useEffect(() => {
    axios
      .get('http://localhost:4000/tickets/types', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => { setTicket(response.data); });
  }, []);

  if (ticket.length === 0) return null;

  let presential;
  let presentialPrice;
  let presentialId;
  let online;
  let onlinePrice;
  let onlineId;
  let withHotelPrice;
  let withHotelId;

  for (let i = 0; i < ticket.length; i++) {
    if (ticket[i].isRemote) {
      online = 'Online';
      onlinePrice = ticket[i].price / 100;
      onlineId = ticket[i].id;
    } else if (!ticket[i].includesHotel) {
      presential = 'Presencial';
      presentialPrice = ticket[i].price / 100;
      presentialId = ticket[i].id;
    } else {
      presential = 'Presencial';
      withHotelPrice = ticket[i].price / 100;
      withHotelId = ticket[i].id;
    }
  }

  return (
    <Container>
      <h1>Ingresso e pagamento</h1>
      <div className="ticket_container">
        <h2 className='text_about_options'>Primeiro, escolha sua modalidade de ingresso</h2>
        <div className="modality_container">
          <Ticket_modality_presential
            collor={presentialCollor}
            onClick={() => { clickInPresential(); }}
          >
            <p>{presential}</p>
            <p className='price'>R$ {' ' + presentialPrice}</p>
          </Ticket_modality_presential>

          <Ticket_modality_online
            collor={onlineCollor}
            onClick={() => { clickInOnline(); }}
          >
            <p>{online}</p>
            <p className='price'>R$ {' ' + onlinePrice}</p>
          </Ticket_modality_online>
        </div>
      </div>
      {select === 'online' ?
        <TicketModality>
          <div>Fechado! O total ficou em R$<strong className='confirmationButton'>{onlinePrice}</strong>. Agora é só confirmar:</div>
          <Button onClick={() => {
            axios
              .post('http://localhost:4000/tickets', {
                ticketTypeId: onlineId
              }, {
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              }).then((response) => {
                navigate('/dashboard/payment/data');
              });
          }}>RESERVAR INGRESSO</Button>
        </TicketModality>
        :
        select === 'presential' ?
          <div className="ticket_container">
            <h2 className='text_about_options'>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
            <div className="modality_container">
              <TicketButton
                onClick={selectTicketWithoutHotel}
                selected={withoutHotel}
              >
                <p>Sem Hotel</p>
                <span>+ R$0</span>
              </TicketButton>
              <TicketButton
                onClick={selectTicketWithHotel}
                selected={withHotel}
              >
                <p>Com Hotel</p>
                <span>+ R$350</span>
              </TicketButton>
            </div>
          </div>
          :
          <></>
      }
      {
        withHotel ?
          <TicketModality>
            <div>Fechado! O total ficou em R$<strong className='confirmationButton'>{withHotelPrice}</strong>. Agora é só confirmar:</div>
            <Button onClick={() => {
              axios
                .post('http://localhost:4000/tickets', {
                  ticketTypeId: withHotelId
                }, {
                  headers: {
                    Authorization: 'Bearer ' + token,
                  },
                }).then((response) => {
                  navigate('/dashboard/payment/data');
                });
            }}>RESERVAR INGRESSO</Button>
          </TicketModality>
          :
          withoutHotel ?
            <TicketModality>
              <div>Fechado! O total ficou em R$<strong className='confirmationButton'>{presentialPrice}</strong>. Agora é só confirmar:</div>
              <Button onClick={() => {
                axios
                  .post('http://localhost:4000/tickets', {
                    ticketTypeId: presentialId
                  }, {
                    headers: {
                      Authorization: 'Bearer ' + token,
                    },
                  }).then((response) => {
                    navigate('/dashboard/payment/data');
                  });
              }}>RESERVAR INGRESSO</Button>
            </TicketModality>
            :
            <></>
      }
    </Container>
  );

  function clickInOnline() {
    if (onlineCollor === 'white' && presentialCollor === 'white') {
      setOnlineCollor('#FFEED2');
      setSelect('online');
    } else if (onlineCollor === 'white' && presentialCollor !== 'white') {
      setWithHotel(false);
      setWithoutHotel(false);
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

  function selectTicketWithHotel() {
    if(withoutHotel) {
      setWithoutHotel(false);
      setWithHotel(true);
    } else {
      setWithHotel(!withHotel);
    }
  }

  function selectTicketWithoutHotel() {
    if(withHotel) {
      setWithoutHotel(true);
      setWithHotel(false);
    } else {
      setWithoutHotel(!withoutHotel);
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

  :hover {
    cursor: pointer;
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

  :hover {
    cursor: pointer;
  }  
`;

const TicketModality = styled.div`
margin-top: 37px;
color: #8E8E8E;
display: flex;
flex-direction: column;
`;

const Button = styled.button`
width: 162px;
height: 37px;
margin-top: 17px;
border: none;
background: #E0E0E0;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-align: center;
`;
