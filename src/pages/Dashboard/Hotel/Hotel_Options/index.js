import axios from 'axios';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import RoomContext from '../../../../contexts/RoomsContext';
import useToken from '../../../../hooks/useToken';

let roomIncludingSelectedKey=[];
export default function Hotel_Options({ name, id, setShowRooms, rooms, booking }) {
  const token = useToken();
  const { setRooms } = useContext(RoomContext);
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
  function showRooms(id) {
    console.log(`cliquei no ${id}`);
    for(let i=0; i < rooms.length; i++) {
      const newObject = Object.assign(rooms[i], { isSelected: false });
      roomIncludingSelectedKey.push(newObject);
      setRooms(roomIncludingSelectedKey);
    } 
    // aqui pode ser feita a mudança de cor
  }
  
  return (
    <>
      <Hotel_option onClick={() => { showRooms(id); setShowRooms(false); }}>
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
