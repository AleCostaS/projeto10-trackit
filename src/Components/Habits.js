import styled from 'styled-components';
import { getHabits } from '../Services/trackit';
import { useState, useEffect } from 'react';
import { ThreeDots } from  'react-loader-spinner';
import { postHabits } from '../Services/trackit';

export default function Habits () {
    const [ habits, setHabits ] = useState([]);
    const auth = JSON.parse(localStorage.getItem('auth'));
    const config = { headers:{'Authorization': 'Bearer '+auth.token}};
    const [ creating, setCreating ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);
    const [ weekdays, setWeekdays ] = useState([false,false,false,false,false,false,false]);
    const [ isAble, setIsAble ] = useState(true);
    const [ object, setObject ] = useState({});
    const [form, setForm] = useState({
        name: '',
    });

    const selectWeekday = (number) => {
        let arr = weekdays;
        arr[number]=!arr[number];
        setWeekdays(arr);
        setRefresh(!refresh);
    };

    function handleForm (e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        if (form.name !== '') {
            setObject({
                name: form.name,
            });
        }
    }, [form]);

    const sendHabit = (event) => {
        event.preventDefault();
        let arr = [];
        
        weekdays.map((day, index) => {
            if (day){
                arr.push(index);
                return arr;
            }
        });
        
        if (!object.name) {
            alert('De um nome ao seu hábito!');
        } else if (arr.length === 0) {
            alert('Selecione ao menos um dia da semana!');
        }
        
        postHabits({
                name: object.name,
                days: arr
        }, config).then(setIsAble(false))
        .catch(function (error) {
            alert('Ocorreu um erro, tente novamente! '+error);
            setIsAble(true);
        }).then(function (response) {
            if (response) {
                setCreating(false)
                console.log(response.data);
            }
        }).finally(function(){
            setIsAble(true);
        })
    }; 
    
    getHabits(config)
    .catch(function (error) {
        alert('Ocorreu um erro no registro, tente novamente! '+error);
    }).then(function (response) {
        if (response) {
            console.log(habits)
            if (habits.length !== response.data.length){
                setHabits(response.data);
            }
        }
    })

    return (
        <Content>
            <Create>
                <p>Meus hábitos</p>
                <button onClick={() => setCreating(true)}>+</button>
            </Create>

            <YoursHabits>
                {creating ? 
                <CreateHabit >
                    <form onSubmit={sendHabit}>
                        <input type="text" name='name' placeholder='nome do hábito' onChange={handleForm} disabled={!isAble ? true : false}></input>
                    
                        <Weekdays>
                            <Weekday selected={weekdays[0]}>
                                <div onClick={() => selectWeekday(0)}>D</div>
                            </Weekday>
                            <Weekday selected={weekdays[1]}>
                                <div onClick={() => selectWeekday(1)}>S</div>
                            </Weekday>
                            <Weekday selected={weekdays[2]}>
                                <div onClick={() => selectWeekday(2)}>T</div>
                            </Weekday>
                            <Weekday selected={weekdays[3]}>
                                <div onClick={() => selectWeekday(3)}>Q</div>
                            </Weekday>
                            <Weekday selected={weekdays[4]}>
                                <div onClick={() => selectWeekday(4)}>Q</div>
                            </Weekday>
                            <Weekday selected={weekdays[5]}>
                                <div onClick={() => selectWeekday(5)}>S</div>
                            </Weekday>
                            <Weekday selected={weekdays[6]}>
                                <div onClick={() => selectWeekday(6)}>S</div>
                            </Weekday>
                        </Weekdays>
                        <Options>
                            <button type="submit">
                                {isAble ? 'Salvar' : <ThreeDots 
                                    height="80" 
                                    width="80" 
                                    radius="9"
                                    color="#FFFFFF" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />}
                            </button>
                            <button onClick={() => setCreating(false)}>Cancelar</button>
                        </Options>
                    </form>
                </CreateHabit> : <></>}
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
    background-color: #52B6FF;
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

const CreateHabit = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 180px;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 18px;

    input {
        box-sizing: border-box;
        width: 98%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 11px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        color: #666666;
    }

    input::placeholder {
        color: #DBDBDB;
    }
`;

const Weekdays = styled.div`
    margin-top: 8px;
    overflow: hidden;
    display: flex;
`;

const Weekday = styled.div`
    div {
        width: 30px;
        height: 30px;
        background-color: ${props => !props.selected ? '#FFFFFF' : '#CFCFCF'};
        border: 1px solid ${props => !props.selected ? '#D5D5D5' : '#CFCFCF'};
        border-radius: 5px;
        margin-right: 8px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        color: ${props => !props.selected ? '#DBDBDB' : '#FFF'};
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Options = styled.div`
    margin-top: 28px;
    display: flex;
    flex-direction: row-reverse;

    button {
        width: 84px;
        height: 35px;
        background-color: #52B6FF;
        border-radius: 5px;
        border: none;
        color: #FFF;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
    }

    button:nth-child(2) {
        background-color: #FFF;
        color: #52B6FF;
        margin-right: 18px;
    }
`;