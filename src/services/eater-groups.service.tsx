import API from './api';

async function getAllEaterGroups(setState, organizationId?:string) {
    // returns user's organization and all public organizations
    const filterParams = (organizationId?:string) => {
        const nullOrgFilter = `{"organization_id": {"_null": "true"}}`
        return organizationId ? 
            `{"_or":[{"organization_id": {"_eq": "${organizationId}"}},${nullOrgFilter}]}` :
            nullOrgFilter
    } 

    const fields = `fields=*,eaters.id,organization_id.*,seasons.seasons_id.*`

    return API.get(`/items/eater_groups?${fields}&filter=${filterParams(organizationId)}`)
    .then(res => {
        console.log(res.data.data)
        setState(res.data.data)
    })
}

async function getEaterGroup(setState, eaterGroupId?:string) {
    const fields = `fields=*,eaters.id,organization_id.*,seasons.seasons_id.*,seasons.seasons_id.farm_id.*`

    return API.get(`/items/eater_groups/${eaterGroupId}?${fields}`)
    .then(res => {
        console.log(res.data.data)
        setState(res.data.data)
    })
}

async function getCurrentEaterGroups(setState,idsOnly?:boolean) {
    const fields = (idsOnly?:boolean) => idsOnly ? `fields=*`: `fields=eater_groups_id.*,eater_groups_id.eaters.id,eater_groups_id.organization_id.*,eater_groups_id.seasons.seasons_id.*,eater_groups_id.seasons.seasons_id.farm_id.*`
    return API.get(`/items/eater_groups_directus_users?${fields(idsOnly)}&filter[directus_users_id][_eq]=$CURRENT_USER&filter[eater_groups_id][_nnull]=true`)
    .then(res => {
        console.log(res.data.data.eater_groups_id)
        setState(res.data.data)
    })
}

async function addEaterGroupUser(body:{directus_users_id:string,eater_groups_id:string}, setState) {
    return API.post('/items/eater_groups_directus_users',
        body
    )
    .then(data => setState(data))
}

export const eaterGroupsService = {getAllEaterGroups,getCurrentEaterGroups,getEaterGroup,addEaterGroupUser}
