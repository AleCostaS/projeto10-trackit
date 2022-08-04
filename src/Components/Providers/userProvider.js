import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }){
    const [user, setUser] = useState();
    const userImage = JSON.parse(localStorage.getItem('userImage'));

    if (!user && userImage){
        setUser(userImage);
    }

    const [percentage, setPercentage] = useState(0);
    const percentageSaved = JSON.parse(localStorage.getItem('percentage'));

    if (percentageSaved){
        if (percentageSaved < percentage){
            localStorage.setItem('percentage', JSON.stringify(percentage));
        } else {
            setPercentage(percentageSaved);
        }
    }

    return (
        <UserContext.Provider value={{ user, percentage, setPercentage }}>
            { children }
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };