import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../../hooks/useToken';

export default function Hotel_Options({ name, id, setShowRooms, rooms, setRooms, booking }) {
  const token = useToken();
  rooms.map(value => {
    useEffect(() => {
      axios.get(`http://localhost:4000/booking/${value.id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then((response) => {
        booking.push(response.data.booking);
      });
    }, []);
  });

  console.log('booking: ', booking);
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
