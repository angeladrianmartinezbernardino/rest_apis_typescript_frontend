// Ejemplo de tus tipos y esquemas, asumiendo que ya están definidos.
import { object, string, number, array, boolean } from 'valibot'

export interface Product {
    id: number;
    name: string;
    price: number;
    availability: boolean;
}

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)

export const DraftProductSchema = object({
    name: string(),
    price: number()
})
