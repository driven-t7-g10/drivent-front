import styled from 'styled-components';
import Hotel from './Hotel';

export default function Hotels({ hotels, setRooms, setShowRooms, setChoosenHotelId }) {
  return (
    <Container>
      {hotels.map((hotel, index) => (
        <Hotel
          key={hotel.id}
          name={hotel.name}
          id={hotel.id}
          rooms={hotel.Rooms}
          setRooms={setRooms}
          image={hotel.image}
          setShowRooms={setShowRooms}
          setChoosenHotelId={setChoosenHotelId}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
    width: 100%;
    height: 264px;
    display: flex;
`;
