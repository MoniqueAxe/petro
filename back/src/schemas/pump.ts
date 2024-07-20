import {z} from 'zod';
import {JustZip} from './address';

const productValues = ["SUPER E10", "Diesel"] as const
const statusValues = ["online", "offline"] as const

export const PumpSchema = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }).optional(),
    name: z.string().min(1,{ message: "Invalid name" }),
    zipCode : JustZip,
    products: z.enum(productValues, {message: "Fuel product not available"}).array().nonempty({message: "Fuel needed"})
    .refine(items => new Set(items).size === items.length, {
        message: 'Must be an array of unique fuel types',
    }),
    status: z.enum(statusValues, {message: "Invalid state"})
})