import TrackitLogin from '../Img/Trackit-Login.png';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Registration () {
    const [object, setObject] = React.useState();
    const [form, setForm] = React.useState({
        email: '',
        password: '',
        name: '',
        url: ''
    });
    
    function handleForm (e) {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        })
       
    }

    useEffect(() => {
        console.log(form);
        if (form.email !== '' && form.password !== '' && form.name !== '' && form.url !== '') {
            setObject(
                
            );
        }
    }, [form]);

    const makeRegister =  () => {
        console.log(form);
    }

    return (
        <>
            <Logo>
                <img src={TrackitLogin} alt=''/>
            </Logo>

            <Form>
                <form onSubmit={makeRegister}>
                    <input type="email" name='email' value={form.email} onChange={handleForm} placeholder='email' />
                    <input type="password" name='password' value={form.password} onChange={handleForm} placeholder='senha' />
                    <input type="name" name='name' value={form.name} onChange={handleForm} placeholder='nome' />
                    <input type="url" name='url' value={form.url} onChange={handleForm} placeholder='foto' />
                    <button type="submit">Cadastrar</button>
                </form>
            </Form>

            <Register>
                <Link  to='/'>
                    Já tem uma conta? Faça login!
                </Link>
            </Register>
        </>
    );
};

const Logo = styled.div`
    margin: 66px 0 34px 0;

    display: flex;
    justify-content: center;
`;

const Register = styled.div`
    font-family: 'Lexend Deca';
    margin: 0px 36px;

    display: flex;
    justify-content: center;

    a {
        text-decoration: underline;
        color: #52B6FF;
    }
`;

const Form = styled.div`
    font-family: 'Lexend Deca';
    box-sizing: border-box;
    margin: 0px 36px;

    display: flex;
    justify-content: center;
    align-items: center;

    button,
    input {
        width: 100%;
        height: 45px;
        margin-bottom: 4px;
        font-size: 18px;
        color: #666666;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
    }

    button {
        padding: 0;
        width: 101%;
        background-color: #52B6FF;
        margin-bottom: 60px;
        border: none;
        font-weight: 400;
        font-size: 22px;
        color: #FFFFFF;
    }

    input::placeholder {
        color: #D4D4D4;
    }
`;