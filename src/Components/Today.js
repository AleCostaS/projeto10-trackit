import { useContext } from 'react';
import UserContext from "./contexts/UserContexts";

export default function Today () {
    const [user, setUser] = useContext(UserContext);
    
    console.log(user)
    return (
        <>
            Today
        </>
    );
};