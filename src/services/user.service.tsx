import API from './api';

async function getCurrentUser(setState) {
    return API.get('/users/me')
    .then(res => setState(res.data.data))
}

export const userService = {getCurrentUser}