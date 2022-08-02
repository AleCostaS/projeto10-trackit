import TrackitLogin from '../Img/Trackit-Login.png';
import styled from 'styled-components';

const Logo = styled.div`
    margin: 66px 0 34px 0;

    display: flex;
    justify-content: center;
`;

export default function Registration () {
    return (
        <>
            <Logo>
                <img src={TrackitLogin} alt=''/>
            </Logo>
        </>
    );
};