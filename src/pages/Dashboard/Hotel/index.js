import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import Room_Options from './Room';

export default function Hotel() {
  const [hotelsList, setHotelsList] = useState([]);
  const [Showrooms, setShowRooms] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [ticket, setTicket] = useState([]);
  const token = useToken();

  useEffect(() => {
    axios.get('http://localhost:4000/hotels', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => {
      setHotelsList(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/tickets', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => { setTicket(response.data); });
  }, []);

  if (ticket.length === 0) return null;

  if (ticket.TicketType.includesHotel === false) {
    return (<Container>
      <h1>Escolha de hotel e quarto</h1>
      <div className="no_hotels_container">
        <h2 className='text_about_options'>Sua modalidade de ingresso não inclui hospedagem
Prossiga para a escolha de atividades</h2>
      </div>
    </Container>);
  }

  if (hotelsList.length === 0) {
    return (<Container>
      <h1>Escolha de hotel e quarto</h1>
      <div className="no_hotels_container">
        <h2 className='text_about_options'>Você precisa ter confirmado pagamento antes
          de fazer a escolha de hospedagem</h2>
      </div>
    </Container>);
  };

  return (
    <Container>
      <h1>Escolha de hotel e quarto</h1>
      <div className="hotels_container">
        <h2 className='text_about_options'>Primeiro, escolha seu hotel</h2>
        <div className="hotels_options_container">
          {hotelsList.map((hotel, index) => (
            <Hotel_Options
              key={index}
              name={hotel.name}
              id={hotel.id}
              setShowRooms={setShowRooms}
              rooms={hotel.Rooms}
              setRooms={setRooms}
            />
          ))}
        </div>
        {Showrooms ? '' :
          <>
            <h2 className='text_about_options'>Ótima pedida! Agora escolha seu quarto:</h2>
            <div className='room_container'>
              {rooms.map((room, index) => (
                <Room_Options
                  key={index}
                  id={room.id}
                  name={room.name}
                  capacity={room.capacity}
                />
              ))}</div>
          </>
        }
      </div>
    </Container>
  );
};

function Hotel_Options({ name, id, setShowRooms, rooms, setRooms }) {
  function showRooms(id) {
    console.log(`cliquei no ${id}`);
    // aqui pode ser feita a mudança de cor
  }

  return (
    <>
      <Hotel_option onClick={() => { showRooms(id); setShowRooms(false); setRooms(rooms); }}>
        {name}
      </Hotel_option>
    </>
  );
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
     margin: 37px 0 17px 0;
 }
 .hotels_options_container{
   display: flex;
 }
 .room_container{
  border: 2px solid green;
  display: flex;
 }
 `;

const Hotel_option = styled.div`
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
