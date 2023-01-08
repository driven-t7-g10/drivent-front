import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../../hooks/useToken';

export default function Hotel_Options({ name, id, setShowRooms, rooms, setRooms, booking, image }) {
  const token = useToken();

  function getAccomodationTypes() {
    let accomodationTypes = [];
    if (rooms.some(room => room.capacity === 1)) {
      accomodationTypes.push('Single');
    }

    if (rooms.some(room => room.capacity === 2)) {
      accomodationTypes.push('Double');
    }

    if (rooms.some(room => room.capacity === 3)) {
      accomodationTypes.push('Triple');
    }

    return accomodationTypes.length > 2 ?
      `${accomodationTypes[0]}, ${accomodationTypes[1]} e ${accomodationTypes[2]}`
      :
      accomodationTypes.join(' e ');
  }

  return (
    <>
      <Hotel_option onClick={() => { setShowRooms(true); setRooms(rooms); }}>
        <img src={image} alt='' />
        <h3>{name}</h3>
        <div>
          <p>Tipos de acomodação:</p>
          <span>{getAccomodationTypes()}</span>
        </div>
        <div>
          <p>Vagas Disponíveis:</p>
          <span>2</span>
        </div>
      </Hotel_option>
    </>
  );
}
const Hotel_option = styled.div`
box-sizing: border-box;
 
width: 196px;
height: 264px;
 
border: 1px solid #CECECE;
border-radius: 20px;
margin-right: 24px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 15.5px 0;
 
p, h3, span {
 font-family: 'Roboto';
 line-height: 19px;
 width: 168px;
 text-align: left;
 color: #454545;
}

p {
  font-size: 16px;
}

h3 {
  font-size: 20px;
  color: rgba(52, 52, 52, 1);
}

span {
  font-size: 12px;
}

img {
  width: 168px;
  height: 109px;
  
}
 
:hover {
 cursor: pointer;
} 
`;
