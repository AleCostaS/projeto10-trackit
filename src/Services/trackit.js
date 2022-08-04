import axios from 'axios';

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';

function postRegister(body) {
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
    return promise;
}

function postLogin(body) {
    const promise = axios.post(`${BASE_URL}/auth/login`, body);
    return promise;
}

function getHabits(config) {
    const promise = axios.get(`${BASE_URL}/habits`, config);
    return promise;
}

function getTodayHabits(config) {
    const promise = axios.get(`${BASE_URL}/habits/today`, config);
    return promise;
}

function postHabits(body, config) {
    const promise = axios.post(`${BASE_URL}/habits`, body, config);
    return promise;
}

export { postRegister, postLogin, getHabits,  getTodayHabits, postHabits };