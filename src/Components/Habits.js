import styled from 'styled-components';
import { getHabits } from '../Services/trackit';
import { useState } from 'react';

export default function Habits () {
    const [ habits, setHabits ] = useState([]);
    const auth = JSON.parse(localStorage.getItem('auth'));
    const config = { headers:{'Authorization': 'Bearer '+auth.token}};
    
    getHabits(config)
    .catch(function (error) {
        alert('Ocorreu um erro no registro, tente novamente! '+error);
    }).then(function (response) {
        if (response) {
            if (habits.length !== response.data.length){
                setHabits(response.data);
                console.log(habits);
            }
        }
    })

    return (
        <Content>
            <Create>
                <p>Meus hábitos</p>
                <button onClick={() => console.log('aqui')}>+</button>
            </Create>

            <YoursHabits>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </YoursHabits>
        </Content>
    );
};

const Content = styled.div`
    padding: 0 18px;
    height: 100vh;
    background-color: #E5E5E5;
`;

const Create = styled.div`
   margin-top: 70px;
   height: 80px;

   display: flex;
   align-items: center;
   justify-content: space-between;

   p {
        color: #126BA5;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
   }

   button {
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    border: none;
    color: #FFF;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 26px;
   }
`;

const YoursHabits = styled.div`
    p {
        padding: 40px 20% 0 20%;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #666666;
        text-align: center;
    }
`;