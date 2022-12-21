import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../../hooks/useToken';

export default function Room_Options({ name, capacity, id }) {
  const [booking, setBooking] = useState([]);
  const token = useToken();

  useEffect(() => {
    axios.get(`http://localhost:4000/booking/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => {
      setBooking(response.data.booking);
    });
  }, []);

  const room = roomLayout();

  function roomLayout() {
    if( capacity === 1 && booking.length === 0) {
      console.log('passou');
      return(
        <Room_Box>vai ser foda</Room_Box>
      );
    } else{
      return (
        <Room_Box>{name},id: {id} {capacity}</Room_Box>
      );
    }
  }

  return (<>{room}</>
    
  );
};

const Room_Box = styled.div`
width: 190px;
height: 45px;
border: 1px solid #CECECE;
border-radius: 10px;
margin-right: 10px;
display: flex;
align-items: center;
padding: 10px;
`;
