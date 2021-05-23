import API from './api';

async function getSeasons(setState,farmId:string) {
    return API.get(`/items/seasons?filter[farm_id][_eq]=${farmId}`)
    .then(res => {
        setState(res.data.data)
    })
}

export const seasonsService = {getSeasons}