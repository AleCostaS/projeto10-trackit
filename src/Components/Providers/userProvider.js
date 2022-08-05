import dayjs from 'dayjs';
import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }){
    const userImage = JSON.parse(localStorage.getItem('userImage'));
    const [user, setUser] = useState(userImage);
    
    const [percentage, setPercentage] = useState(0);
    
    localStorage.setItem('day', JSON.stringify(dayjs()));

    const day = JSON.parse(localStorage.getItem('day'));

    if (!dayjs().isSame(day, 'hour')){
        console.log('hour changed')
        localStorage.setItem('percentage', JSON.stringify(percentage));
    }
    
    const percentageSaved = JSON.parse(localStorage.getItem('percentage'));

    if (percentageSaved){
        if (percentageSaved <= percentage){
            localStorage.setItem('percentage', JSON.stringify(percentage));
        } else {
            setPercentage(percentageSaved);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, percentage, setPercentage }}>
            { children }
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };