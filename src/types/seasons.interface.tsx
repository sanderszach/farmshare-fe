
export const seasonStatus = {
    "in-progress": {type:"info", displayText:"In Progress"},
    "enrolling": {type:"success", displayText:"Enrolling"},
}

export type SeasonStatus = "in-progress" | "enrolling"

export interface Season {
    id:number
    farm_id:number
    name?:string
    description?:string
    start_date: Date
    end_date: Date
    price?:number
    capacity?:number
    status?:SeasonStatus
}

