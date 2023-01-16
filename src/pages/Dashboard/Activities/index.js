import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import EventDay from './EventDay';
import useToken from '../../../hooks/useToken';

export default function Activities() {
  const [ firstDay, setFirstDay ] = useState(false);
  const [ activities, setActivities ] = useState([]);
  const token = useToken();

  const BASE_URL = 'http://localhost:4000';

  useEffect(() => {
    axios
      .get(`${BASE_URL}/activities`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => { setActivities(response.data); });
  }, []);

  console.log('11111: ', activities);
  function mainAuditorium() {
    return (
      <Place>
        <div className='mainActivities'>
          <div className='eventName'>
            <h1>Minecraft: montando o PC ideal</h1>
            <h2>09:00-10:00</h2>
          </div>
          <div className='eventVacancies'>
            <h1>Foto</h1>
            <p>27 vagas</p>
          </div>
        </div>
        <div className='mainActivities'>
          <div className='eventName'>
            <h1>Lol: montando o PC ideal</h1>
            <h2>10:00-11:00</h2>
          </div>
          <div className='eventVacancies'>
            <h1>Foto</h1>
            <p>Esgotado</p>
          </div>
        </div>
      </Place>
    );
  }

  function sideAuditorium() {
    return (
      <Place>
        <div className='mainActivities'>
          <div className='eventName'>
            <h1>Palestra x</h1>
            <h2>09:00-11:00</h2>
          </div>
          <div className='eventVacancies'>
            <h1>Foto</h1>
            <p>27 vagas</p>
          </div>
        </div>
      </Place>
    );
  }

  function workshopRoom() {
    return (
      <Place>
        <Line>
          <div className='mainActivities'>
            <div className='eventName'>
              <h1>Palestra y</h1>
              <h2>09:00-10:00</h2>
            </div>
            <div className='eventVacancies'>
              <h1>Foto</h1>
              <p>27 vagas</p>
            </div>
          </div>
        </Line>
      </Place>
    );
  }
  if(firstDay) {
    return (
      <>
        <ChoiceOfActivities>
          <h1>Escolha de atividades</h1>
          <EventDay setFirstDay={setFirstDay}/>
        </ChoiceOfActivities>
        <ActivitiesPlaces>
          <p>Auditório Principal</p>
          <p>Auditório Lateral</p>
          <p>Sala de Workshop</p>
        </ActivitiesPlaces>
        <EventPlace>
          {mainAuditorium()}
          {sideAuditorium()}
          {workshopRoom()}
        </EventPlace>
      </>
    );
  }
  if(!firstDay) {
    return (
      <>
        <ChoiceOfActivities>
          <h1>Escolha de atividades</h1>
          <h2>Primeiro, filtre pelo dia do evento</h2>
          <EventDay setFirstDay={setFirstDay}/>
        </ChoiceOfActivities>
      </>
    );
  }
}

const ChoiceOfActivities = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;

  h1 {
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;
  }

  h2 {
    margin-top: 25px;
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
  }

  .eventDay {
    width: 420px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  h3, h4, h5 {
    width: 131px;
    height: 37px;
    font-size: 14px;
    top: 328px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const ActivitiesPlaces = styled.div`
    display: flex;
    justify-content: space-around;
    width: calc(80% -20%);
    border-bottom: 1px solid #D7D7D7;
    transform: rotate(0.07deg);
    height: 30px;
    margin-top: 60px;
    padding-bottom: 20px;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    color: #7B7B7B;
`;

const EventPlace = styled.div`
display: flex;
`;

const Place = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  width: calc(70% - 35%);
  height: 350px;
  border-left: 1px solid #D7D7D7;
  border-bottom: 1px solid #D7D7D7;

  .mainActivities {
    display: flex;
    align-items: center;
    width: calc(95% - 5%);
    height: 79px;
    background: #F1F1F1;
    border-radius: 5px;
    margin-top: 15px;
    color: #343434;
  }

  .eventName {
    width: calc(85% - 15%);
    border-right: 1px solid #CFCFCF;
    height: 60px;
    margin: 0 5px;
    padding-right: 15px;
    margin-right: 10px;

    h1 {
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
    }

    h2 {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      margin-top: 5px;
    }
  }

  .eventVacancies {
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-size: 9px;
    color: #078632;
    margin-right: 5px;
    cursor: pointer;
  }
`;

const Line = styled.div`
  height: 350px;
  width: calc(101% - 1%);
  border-right: 1px solid #D7D7D7;
  padding: 0 10px;
`;
