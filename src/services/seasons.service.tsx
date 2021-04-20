import { Farm } from "../types";
import API from './api';

// async function createFarm(body:Farm, setState) {
//     return API.post('/items/farms',
//         body
//     )
//     .then(data => setState(data))
// }

async function getSeasons(setState,farmId:string) {
    return API.get(`/items/seasons?filter[farm_id][_eq]=${farmId}`)
    .then(res => {
        console.log(res.data.data)
        setState(res.data.data)
    })
}

export const seasonsService = {getSeasons}