
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const [hotelsList, setHotelsList] = useState([]);
  const token = useToken();

  useEffect(() => {
    axios.get('http://localhost:4000/hotels', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => { setHotelsList(response.data); });
  }, []);

  console.log(hotelsList);
  return (
    <Container>
      <h1>Escolha de hotel e quarto</h1>
      <div className="hotels_container">
        <h2 className='text_about_options'>Primeiro, escolha seu hotel</h2>
        <div className="hotels_options_container">
          <Hotel_option>

          </Hotel_option>
        </div>
      </div>

    </Container>
  );
};

const Container = styled.div`
 display: flex;
 flex-direction: column;
 
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
 .text_about_options{
     margin: 37px 0 17px 0;
 }
 .hotels_options_container{
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
background: ${props => props.collor};
 
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
