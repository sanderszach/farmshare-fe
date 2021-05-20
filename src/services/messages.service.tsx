import { Farm } from "../types";
import API from './api';

async function getMessages(setState) {
    return API.get(`/items/messages`)
    .then(res => {
        console.log(res.data.data)
        setState(res.data.data)
    })
}

export const messagesService = {getMessages}