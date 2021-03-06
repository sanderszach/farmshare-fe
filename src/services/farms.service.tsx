import { Farm } from "../types";
import API from './api';

async function createFarm(body:Farm, setState) {
    return API.post('/items/farms',
        body
    )
    .then(data => setState(data))
}

async function getFarms(setState,id?:string) {
    return API.get(`/items/farms/${id ? id : ''}`)
    .then(res => {
        setState(res.data.data)
    })
}

export const farmsService = {createFarm, getFarms}