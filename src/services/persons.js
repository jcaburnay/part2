import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
}

const addPerson = async (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    const response = await request;
    return response.data;
}

const deletePerson = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
}

const methods = { getAll, addPerson, deletePerson }

export default methods