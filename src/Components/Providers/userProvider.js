import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }){
    const [user, setUser] = useState();
    const userImage = JSON.parse(localStorage.getItem('userImage'));

    if (!user && userImage){
        setUser(userImage);
    }

    return (
        <UserContext.Provider value={{ user }}>
            { children }
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };