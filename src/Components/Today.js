import styled from 'styled-components';
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { getTodayHabits } from '../Services/trackit';
import { useState } from 'react';
import { checkHabits } from '../Services/trackit';
import { uncheckHabits } from '../Services/trackit';

// Plugins
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";

// Load plugins
dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export default function Today () {
    const [ todayHabits, setTodayHabits ] = useState([]);
    const auth = JSON.parse(localStorage.getItem('auth'));
    const config = { headers:{'Authorization': 'Bearer '+auth.token}};

    function gettingTodayHabits () {
            getTodayHabits(config)
        .catch(function (error) {
            alert('Ocorreu um erro no registro, tente novamente! '+error);
        }).then(function (response) {
            if (response) {
                if (todayHabits.length !== response.data.length){
                    setTodayHabits(response.data);
                    console.log(response.data)
                }
            }
        })
    };

    gettingTodayHabits();
    
    const checkingHabits = (habitId) => {
        checkHabits(habitId, config)
        .catch(function (error) {
            alert('Ocorreu um erro, tente novamente! '+error);
        }).then(function (response) {
            console.log(response)
            gettingTodayHabits();
        })
    };

    const uncheckingHabits = (habitId) => {
        uncheckHabits(habitId, config)
        .catch(function (error) {
            alert('Ocorreu um erro, tente novamente! '+error);
        }).then(function (response) {
            console.log(response)
            gettingTodayHabits();
        })
    };
    
    return (
        <Content>
            <Day>
                {dayjs().locale("pt").format("dddd")+', '+dayjs().locale("pt").format("D/MM")}
                <p>Nenhum hábito concluído ainda</p>
            </Day>

            <TodayHabits>
                {!todayHabits || todayHabits.length === 0 ? <p>Você ainda não possui nenhum hábito</p> : todayHabits.map((habit) => {
                    return <ShowingHabits checked={habit.done}>
                        <span>
                            <Data>
                                <h1>{habit.name}</h1>
                                <div>
                                    <p>Sequência atual: {habit.currentSequence} dias</p>
                                    <p>Seu recorde: {habit.highestSequence} dias</p>
                                </div>
                            </Data>

                            <button onClick={() => !habit.done ? checkingHabits(habit.id) : uncheckingHabits(habit.id)} >
                                <ion-icon name="checkmark-outline"></ion-icon>
                            </button>
                        </span>
                    </ShowingHabits>
                })}    
            </TodayHabits>
            
        </Content>
    );
};

const Content = styled.div`
    padding: 0 18px;
    height: 100vh;
    background-color: #E5E5E5;
`;

const Day = styled.div`
    margin-top: 70px;
    padding-top: 28px;
    color: #126BA5;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 23px;

    p {
        margin-top: 6px;
        margin-bottom: 32px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #BABABA;
    }
`;

const TodayHabits = styled.div`
    margin: 0 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    p {
        margin: 30vh 20px 0 20px;
        text-align: center;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #BABABA;
    }
`;

const ShowingHabits = styled.div`
    padding: 13px;
    width: 100%;
    height: 124px;
    background: #FFFFFF;
    border-radius: 5px;
    overflow: hidden;

    span {
        display: flex;
        justify-content: space-between;
    }

    span button {
        border: none;
        cursor: pointer;
        border-radius: 5px;
        background-color:   ${props => props.checked ? '#8FC549' : '#EBEBEB'} ;
        margin: 4px;
        width: 119px;
        height: 119px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    span button  ion-icon {
        font-size: 64px;
        --ionicon-stroke-width: 66px;
        color: #FFFFFF;
    }
    
    h1 {
        margin: 0;
        margin-top: 12px;
        text-align: left;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 24px;
        color: #666666;
    }
`;

const Data = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
        background-color: #fff;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    
    p {
        margin: 0;
        padding: 0;
        text-align: left;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 16px;
        color: #666666;
    }
`;