import styled from 'styled-components';

export function ReservatedRoom({ name, image, choosenRoom }) {
  const capacity = Array.from({ length: choosenRoom.map(value => value.capacity) }, (k, i) => i);
  const roomName = choosenRoom.map(room => room.name);

  function accomodationType(capacity) {
    if(capacity.length === 1) {
      return (
        <>(Single)</>
      );
    } else if(capacity.length === 2 ) {
      return (
        <>(Double)</>
      );
    } else {
      return (
        <> (Triple)</>
      );
    }
  };

  return (
    <Container>
      <img src={image} alt='imagem do hotel'/>
      <h3>{name}</h3>
      <div>
        <p>Quarto Reservado:</p>
        <span>{roomName} {accomodationType(capacity)}</span>
      </div>
      <div>
        <p>Pessoas no seu Quarto:</p>
        {capacity.length === 1 ? <span>Somente você</span> : <span> Você e mais {capacity.length -1}</span> }
      </div>
    </Container>
  );
}

const Container = styled.div`
box-sizing: border-box;
 
 width: 196px;
 height: 264px;
 background-color: rgba(235, 235, 235, 1);
 border-radius: 20px;
 margin-right: 24px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-between;
 padding: 15.5px 0;
  
 p, h3, span {
  font-family: 'Roboto';
  width: 168px;
  text-align: left;
  color: #454545;
 }
 
 p {
   font-size: 12px;
   font-weight: 700;
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
`;

