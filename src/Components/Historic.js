import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { getDailyHabits } from '../Services/trackit';
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

export default function Historic () {
    const [ habits, setHabits ] = useState([]);
    const auth = JSON.parse(localStorage.getItem('auth'));
    const config = { headers:{'Authorization': 'Bearer '+auth.token}};
    let daysMarkeds = [];

    getDailyHabits(config)
    .catch(function (error) {
        alert('Ocorreu um erro no registro, tente novamente! '+error);
    }).then(function (response) {
        if (response) {
            if (habits.length !== response.data.length){
                setHabits(response.data);
            }
        }
    })
    
    if (habits.length !== 0) {
        habits.map((day) => {
            let c1 = 0;
            let c2 = 0;
            day.habits.map((habit) => {
                c2++
                if (habit.done){
                    c1++
                }
                if (c1 === day.habits.length){
                    daysMarkeds.push({day: dayjs(day.day.split('/')[1]+'/'+day.day.split('/')[0]+'/'+day.day.split('/')[2]), done: true})
                } else if (c2 === day.habits.length){
                    daysMarkeds.push({day: dayjs(day.day.split('/')[1]+'/'+day.day.split('/')[0]+'/'+day.day.split('/')[2]), done: false})
                }
            });
        });
    }
    
    const formatDate = (date) => {
        let answer = '';

        daysMarkeds.map((dayMarked) => {
            if (dayjs().format('l') !== dayjs(dayMarked.day).format('l') && dayjs(dayMarked.day).format('l') === dayjs(date).format('l')) {
                if (dayMarked.done){
                    answer = 'done';
                } else {
                    answer = 'almost'
                }
            }
        })

        return answer;
    }

    const handleDate = (value) => {
        console.log(value)
        console.log(habits)
    };

    return (
        <Content>
            <Title>
                Histórico
            </Title>

            <ShowCalendar>
                <Calendar
                    calendarType='US'
                    onClickDay={(value, event) => handleDate(value)}
                    locale='pt-br'
                    tileClassName={(date) => formatDate(dayjs(date.date))}
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
        height: 422px;
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
        height: 45px;
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

    .done {
        background-image: linear-gradient(#8FC549, #8FC549);
    }

    .almost {
        background-image: linear-gradient(red, red);
    }

    .almost,
    .done {
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        border: none;
        padding: 0 20px;
        color: #000;
    }
`;