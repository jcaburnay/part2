import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
}

const add = async (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    const response = await request;
    return response.data;
}

export default { getAll, add }