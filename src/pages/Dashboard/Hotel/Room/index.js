import { useContext, useState } from 'react';
import styled from 'styled-components';
import RoomContext from '../../../../contexts/RoomsContext';

export default function Room_Options({ name, capacity, id, booking, isSelected, selectedRoom, setSelectedRoom }) {
  const bookingByRoomId = [];
  const { rooms } = useContext(RoomContext);

  for(let i=0; i < booking.length; i++) {
    for(let j=0; j< booking[i].length; j++) {
      if(booking[i][j].roomId === id) {
        bookingByRoomId.push(booking[i][j]);
      }
    } 
  };

  function selectRoom() {
    const selectedPrev = selectedRoom.find((room) => room.roomId === id );
    if(selectedPrev) {
      const findSelectedRoomInArray = rooms.find((room) => room.id === id);
      findSelectedRoomInArray.isSelected = false;
      const newRoomSelected = selectedRoom.filter((room) => room.roomId === id);
      setSelectedRoom(newRoomSelected);
    } else {
      setSelectedRoom([...selectedRoom, { roomId: id, isSelected: true, roomNumber: name }]);
      const findSelectedRoomInArray = rooms.find((room) => room.id === id);
      findSelectedRoomInArray.isSelected = true;
    }
  };

  function selectRoom() {
    const selectedPrev = selectedRoom.find((room) => room.roomId === id );
    if(selectedPrev && selectedRoom[0].roomId === id) {
      const findSelectedRoomInArray = rooms.find((room) => room.id === id);
      findSelectedRoomInArray.isSelected = false;
    }
    setSelectedRoom([...selectedRoom, { roomId: id, isSelected: true, roomNumber: name }]);
    const findSelectedRoomInArray = rooms.find((room) => room.id === id);
    findSelectedRoomInArray.isSelected = true;
  }

  if( capacity === 1 && bookingByRoomId.length === 0) {
    return(
      <Room_Box_Avalible onClick={selectRoom} isSelected={isSelected} >
        <div>{name}</div>
        { isSelected ? <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon>  :  <ion-icon  name="person-outline"></ion-icon>  }
      </Room_Box_Avalible>
    );
  }else if(capacity === 1 && bookingByRoomId.length === 1) {
    return(
      <Room_Box style={{ background: '#E9E9E9' }}>
        <div>{name}</div>
        <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
      </Room_Box>
    );
  } else if(capacity === 2 && bookingByRoomId.length === 0) {
    return(
      <Room_Box_Avalible onClick={selectRoom} isSelected={isSelected}>
        <div>{name}</div>
        <div>
          <ion-icon nam_ARoom_Box_Avaliblee="person-outline"></ion-icon>
          { isSelected ? <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon>  :  <ion-icon  name="person-outline"></ion-icon>  }
        </div>
      </Room_Box_Avalible>
    );
  } else if(capacity === 2 && bookingByRoomId.length === 1) {
    return(
      <Room_Box_Avalible onClick={selectRoom} isSelected={isSelected}>
        <div>{name}</div>
        <div>
          { isSelected ? <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon>  :  <ion-icon  name="person-outline"></ion-icon>  }
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
        </div>
      </Room_Box_Avalible>
    );
  } else if(capacity === 2 && bookingByRoomId.length === 2) {
    return(
      <Room_Box style={{ background: '#E9E9E9' }}>
        <div>{name}</div>
        <div>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
        </div>
      </Room_Box>
    ); 
  } else if(capacity === 3 && bookingByRoomId.length === 0) {
    return(
      <Room_Box_Avalible onClick={selectRoom} isSelected={isSelected}>
        <div>{name}</div>
        <div>
          { isSelected ? <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon>  :  <ion-icon  name="person-outline"></ion-icon>  }
          <ion-icon name="person-outline"></ion-icon>
          <ion-icon name="person-outline"></ion-icon>
        </div>
      </Room_Box_Avalible>
    ); 
  } else if(capacity === 3 && bookingByRoomId.length === 1) {
    return(
      <Room_Box_Avalible onClick={selectRoom} isSelected={isSelected}>
        <div>{name}</div>
        <div>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          { isSelected ? <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon>  :  <ion-icon  name="person-outline"></ion-icon>  }
          <ion-icon name="person-outline"></ion-icon>
        </div>
      </Room_Box_Avalible>
    ); 
  } else if(capacity === 3 && bookingByRoomId.length === 2) {
    return(
      <Room_Box_Avalible onClick={selectRoom} isSelected={isSelected}>
        <div>{name}</div>
        <div>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          { isSelected ? <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon>  :  <ion-icon  name="person-outline"></ion-icon>  }
        </div>
      </Room_Box_Avalible>
    ); 
  } else if(capacity === 3 && bookingByRoomId.length === 3) {
    return(
      <Room_Box style={{ background: '#E9E9E9' }}>
        <div>{name}</div>
        <div>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
        </div>
      </Room_Box>
    ); 
  } 
};

const Room_Box = styled.div`
width: 190px;
height: 45px;
border: 1px solid #CECECE;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: space-between;
margin: 0px 16px 16px 0px;
padding: 14px;

ion-icon{
    font-size: 24px;
}

:hover {
 cursor: pointer;
} 
`;

const Room_Box_Avalible = styled.div`
width: 190px;
height: 45px;
border: 1px solid #CECECE;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: space-between;
margin: 0px 16px 16px 0px;
padding: 14px;
background: ${props => props.isSelected ? '#FFEED2' : 'white'};

ion-icon{
    font-size: 24px;
}

:hover {
 cursor: pointer;
} 
`;

