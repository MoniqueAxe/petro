import { UUID } from "crypto";
export type Fuel = "SUPER E10"| "Diesel"

export type Status = 'online'| 'offline'

export interface Pump {
    id: UUID,
    name: string,
    products: Fuel[],
    zipCode: number | string,
    status: Status
}


