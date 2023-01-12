import { green } from '@material-ui/core/colors';
import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export default function Room({ name, capacity, id, bookings, selectedRoom, setSelectedRoom }) {
  const spots = new Array(capacity).fill(true);

  if (bookings.length === 0 && selectedRoom === id) spots[0] = id;

  for (let i = 0; i < bookings.length; i++) {
    if (i >= spots.length) break;
    spots[i] = false;
    if (selectedRoom === id) {
      spots[i+1] = id;
    }
  };

  return (
    spots.length <= bookings.length ?
      <Container full>
        <span>{name}</span>
        <div>
          {spots.map((_spot, index) => (
            <ion-icon key={index} style={{ color: '#8C8C8C' }} name="person" />
          ))}
        </div>
      </Container>
      :
      <Container selected={selectedRoom === id} onClick={() => setSelectedRoom(id)}>
        <span>{name}</span>
        <div>
          {spots.map((spot, index) => {
            return spot === false ?
              <ion-icon key={index} style={{ color: 'rgba(0, 0, 0, 1)' }} name="person" />
              :
              spot === id ?
                <ion-icon key={index} style={{ color: 'rgba(255, 71, 145, 1)' }} name="person" />
                :
                <ion-icon key={index} name="person-outline" />;
          })}
        </div>
      </Container>
  );
};
const Container = styled.div`
width: 190px;
height: 45px;
background-color: ${({ selected }) => selected ? 'rgba(255, 238, 210, 1)' : ''};
border: 1px solid #CECECE;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 14px;
margin: 0 15px 8px 0;

ion-icon{
    font-size: 21px;
}

div {
  display: flex;
  flex-direction: row-reverse;
}

${({ full }) => (
    full ?
      `
        background-color: rgba(233, 233, 233, 1);
      `
      :
      `
        :hover {
          cursor: pointer;
        }
      `
  )}

`;

