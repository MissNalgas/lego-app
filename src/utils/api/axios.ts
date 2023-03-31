import axios from 'axios';
import { API_URL } from '@env';

export default async function getAxios() {
    const instance = axios.create({
        baseURL: API_URL
    });

    return instance;
}