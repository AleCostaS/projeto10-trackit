import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from "dayjs";
import { useState } from 'react';

export default function Historic () {
    const [date, setDate] = useState();
    const locale = 'fr-CA';
    
    const markDay = (date) => {
        new Intl.DateTimeFormat(
        locale, 
        {
            day: "2-digit"
        }).format(date)
    };

    return (
        <Content>
            <Title>
                Histórico
            </Title>

            <ShowCalendar>
                <Calendar
                    calendarType='US'
                    formatDay={markDay(date)}
                />
            </ShowCalendar>
        </Content>
    );
};


const Content = styled.div`
    padding: 0 18px;
    height: 100vh;
    background-color: #E5E5E5;
`;

const Title = styled.div`
    margin-top: 70px;
    padding-top: 28px;
    padding-bottom: 11px;
    color: #126BA5;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 23px;
`;

const ShowCalendar = styled.div`
    .react-calendar {
        width: 100%;
        height: 402px;
        border-radius: 15px;
        border: none;
    }
    
    .react-calendar__navigation button {
        color: #666666;
        font-size: 20px;
        margin-top: 8px;
        border-radius: 5px;
        font-family: 'Lexend Deca';
    }

    .react-calendar__tile {
        width: 20px;
        height: 55px;
    }

    .react-calendar__tile--now {
        border-radius: 6px;
    }
   
    .react-calendar__tile--active {
        background: #6f48eb;
        border-radius: 12px;
        font-weight: bold;
        color: white;
        box-sizing: border-box;
    }

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #6f48eb;
        color: white;
    }
    
    .react-calendar__month-view__weekdays {
        text-decoration: none;
        color: #666666;
        font-size: 14px;
    }
`;