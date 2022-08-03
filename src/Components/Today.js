import { useContext } from 'react';
import styled from 'styled-components';
import UserContext from "./contexts/UserContexts";
import dayjs from "dayjs";
import "dayjs/locale/pt";

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
    const [user, setUser] = useContext(UserContext);
    
    return (
        <>
            <Content>
                <Day>
                    {dayjs().locale("pt").format("dddd")+', '+dayjs().locale("pt").format("D/MM")}
                    <p>Nenhum hábito concluído ainda</p>
                </Day>
               
            </Content>
        </>
        
    );
};

const Content = styled.div`
    padding: 70px 18px 0 18px;
    height: 100vh;
    background-color: #E5E5E5;
`;

const Day = styled.div`
    margin-top: 28px;
    color: #126BA5;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 23px;

    p {
        margin-top: 6px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #BABABA;
    }
`;
