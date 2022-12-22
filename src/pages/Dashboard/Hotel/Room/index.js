import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export default function Room_Options({ name, capacity, id, booking }) {
  const bookingByRoomId = [];
  const [backGroundSelectedRoom, setBackgroundSelectedRoom] = useState('white');
  const [ionIconSelected, setIonIconSelected] = useState(true);

  for(let i=0; i < booking.length; i++) {
    for(let j=0; j< booking[i].length; j++) {
      if(booking[i][j].roomId === id) {
        bookingByRoomId.push(booking[i][j]);
      }
    } 
  };
  function clicou() {
    setBackgroundSelectedRoom('#FFEED2');
    setIonIconSelected(false);
    if(backGroundSelectedRoom === '#FFEED2' && ionIconSelected === false) {
      setBackgroundSelectedRoom('white');
      setIonIconSelected(true);
    };
  };

  if( capacity === 1 && bookingByRoomId.length === 0) {
    return(
      <Room_Box_Avalible onClick={clicou} collor={backGroundSelectedRoom}>
        <div>{name}</div>
        {ionIconSelected ? <ion-icon  name="person-outline"></ion-icon> : <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon> }
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
      <Room_Box_Avalible onClick={clicou} collor={backGroundSelectedRoom}>
        <div>{name}</div>
        <div>
          <ion-icon nam_ARoom_Box_Avaliblee="person-outline"></ion-icon>
          {ionIconSelected ? <ion-icon  name="person-outline"></ion-icon> : <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon> }
        </div>
      </Room_Box_Avalible>
    );
  } else if(capacity === 2 && bookingByRoomId.length === 1) {
    return(
      <Room_Box_Avalible onClick={clicou} collor={backGroundSelectedRoom}>
        <div>{name}</div>
        <div>
          {ionIconSelected ? <ion-icon  name="person-outline"></ion-icon> : <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon> }
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
      <Room_Box_Avalible onClick={clicou} collor={backGroundSelectedRoom}>
        <div>{name}</div>
        <div>
          {ionIconSelected ? <ion-icon  name="person-outline"></ion-icon> : <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon> }
          <ion-icon name="person-outline"></ion-icon>
          <ion-icon name="person-outline"></ion-icon>
        </div>
      </Room_Box_Avalible>
    ); 
  } else if(capacity === 3 && bookingByRoomId.length === 1) {
    return(
      <Room_Box_Avalible onClick={clicou} collor={backGroundSelectedRoom}>
        <div>{name}</div>
        <div>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          {ionIconSelected ? <ion-icon  name="person-outline"></ion-icon> : <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon> }
          <ion-icon name="person-outline"></ion-icon>
        </div>
      </Room_Box_Avalible>
    ); 
  } else if(capacity === 3 && bookingByRoomId.length === 2) {
    return(
      <Room_Box_Avalible onClick={clicou} collor={backGroundSelectedRoom}>
        <div>{name}</div>
        <div>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          <ion-icon style={{ color: '#8C8C8C' }} name="person"></ion-icon>
          {ionIconSelected ? <ion-icon  name="person-outline"></ion-icon> : <ion-icon style={{ color: '#FF4791' }} name="person"></ion-icon> }
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
  else {
    return (
      <Room_Box>{name},id: {id} {capacity}</Room_Box>
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
background: ${props => props.collor };

ion-icon{
    font-size: 24px;
}

:hover {
 cursor: pointer;
} 
`;

