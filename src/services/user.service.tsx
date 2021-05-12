import API from './api';

async function getCurrentUser(setState) {
    return API.get('/users/me')
    .then(res => setState(res.data.data))
}

async function getUserEaterGroups(userId:string,setState) {
    return API.get(`/items/eater_groups?fields=*,eaters.*&deep[eaters][_filter][directus_users_id]=$CURRENT_USER&filter[eaters][_has]=1`)
    .then(res => setState(res.data.data.filter(x => x.eaters.length > 0))) // TODO: This filter is a temporary workaround. Need to apply filters to the API call to only return eater_groups with valid user
}

export const userService = {getCurrentUser,getUserEaterGroups}