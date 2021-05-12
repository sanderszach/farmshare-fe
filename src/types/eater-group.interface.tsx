import { Season } from ".";
import { Organization } from "./organization.interface";

export interface EaterGroup {
    id:string
    name:string
    organization_id: Organization | null
    status:string
    eaters:{id:number}[]
    discount_rate:number
    seasons:{seasons_id:Season}[]
}