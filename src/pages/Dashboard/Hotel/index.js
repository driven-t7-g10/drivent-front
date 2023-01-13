import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import Hotels from '../../../components/Dashboard/Hotel/Hotels';
import Rooms from '../../../components/Dashboard/Hotel/Rooms';
import { useNavigate } from 'react-router-dom';
import { ReservatedRoom } from './ReservatedRoom';

export default function Hotel() {
  const token = useToken();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [isPaidTicket, setIsPaidTicket] = useState(true);
  const [isRightTicket, setIsRightTicket] = useState(true);
  const [choosenHotelId, setChoosenHotelId] = useState(0);
  const [choosenHotel, setChoosenHotel] = useState([]);
  const [choosenRoom, setChoosenRoom] = useState([]);
  const [showReservation, setShowReervation] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/hotels', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        console.log(response.data);
        setHotels(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate('/dashboard/subscription');
        } else if (error.response.status === 402) {
          setIsPaidTicket(false);
        } else if (error.response.status === 403) {
          setIsRightTicket(false);
        }
      });
  }, []);

  if (hotels.length === 0) {
    return (
      isPaidTicket && isRightTicket ?
        <Container>
          <h1>Escolha de hotel e quarto</h1>
          <NoHotels>Neste momento, não há hoteis</NoHotels>
        </Container>
        :
        isRightTicket ?
          <Container>
            <h1>Escolha de hotel e quarto</h1>
            <NoHotels>Você precisa ter confirmado pagamento antes<br />
              de fazer a escolha de hospedagem</NoHotels>
          </Container>
          :
          <Container>
            <h1>Escolha de hotel e quarto</h1>
            <NoHotels>Sua modalidade de ingresso não inclui hospedagem<br />
            Prossiga para a escolha de atividades</NoHotels>
          </Container>
    );
  };

  async function postBooking(selectedRoom) {
    await axios.post('http://localhost:4000/booking', { roomId: selectedRoom }, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => {
      const hotel = hotels.filter(value => value.id === choosenHotelId);
      const rooms = hotel.map(value => value.Rooms);
      const room = rooms[0].filter(value => value.id === selectedRoom);
      setChoosenRoom(room);
      setChoosenHotel(hotel);
      setShowReervation(false);
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <Container available>
      <h1>Escolha de hotel e quarto</h1>
      {showReservation ? 
        <>
          <ChooseText>Primeiro, escolha seu hotel</ChooseText>
          <Hotels
            hotels={hotels}
            setRooms={setRooms}
            setChoosenHotelId={setChoosenHotelId}
          />
          {rooms.length === 0 ? '' :
            <>
              <ChooseText>Ótima pedida! Agora escolha seu quarto:</ChooseText>
              <Rooms
                rooms={rooms}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
              <ReservationButton onClick={() => postBooking(selectedRoom)}>RESERVAR QUARTO</ReservationButton>
            </>
          }     
        </>
        :
        <>
          <ChooseText>Você já escolheu seu quarto:</ChooseText>
          {choosenHotel.map((hotel, index) => (
            <ReservatedRoom
              key={index}
              name={hotel.name}
              image={hotel.image}
              choosenRoom={choosenRoom}
            />
          ))}
          <UpdateReservationButton>TROCAR DE QUARTO</UpdateReservationButton>
        </>}
    </Container>
  );
};

const Container = styled.div`
 display: flex;
 flex-direction: column;
 height: 100%;

 h1 {
    font-family: 'Roboto',sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
 }
 `;
const UpdateReservationButton = styled.button`
width: 182px;
height: 37px;
background: #E0E0E0;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;
margin-top: 20px;
border: none;
font-family: 'Roboto';
font-size: 14px;
text-align: center;
color: #000000;

:hover {
 cursor: pointer;
} 
`;

const ReservationButton = styled.button`
width: 182px;
height: 37px;
background: #E0E0E0;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;
margin-top: 20px;
border: none;
font-family: 'Roboto';
font-size: 14px;
text-align: center;
color: #000000;

:hover {
 cursor: pointer;
} 
`;

const NoHotels = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  text-align: center;
`;

const ChooseText = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin: 37px 0 17px;
`;
