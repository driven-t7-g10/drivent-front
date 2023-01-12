import styled from 'styled-components';
import Room from './Room';

export default function Rooms({ rooms, selectedRoom, setSelectedRoom }) {
  return (
    <Container>
      {rooms.map((room, index) => (
        <Room
          key={room.id}
          id={room.id}
          name={room.name}
          capacity={room.capacity}
          bookings={room.Booking}
          selectedRoom={selectedRoom} 
          setSelectedRoom={setSelectedRoom}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;
