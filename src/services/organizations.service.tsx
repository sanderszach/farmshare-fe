import API from './api';

async function getCurrentOrganization(setState,organizationId:string) {
    return API.get(`/items/organizations/${organizationId}`)
    .then(res => {
        console.log(res.data.data)
        setState(res.data.data)
    })
}

export const organizationsService = {getCurrentOrganization}