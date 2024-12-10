// Importamos las dependencias necesarias.
import { safeParse, number, parse, coerce } from 'valibot'
import axios from 'axios'
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types/types"
import { toBoolean } from '../utils/utils';

// Definimos el tipo ProductData para manejar los datos recibidos desde el formulario.
type ProductData = {
    [k: string]: FormDataEntryValue;
}

// Función para agregar un producto.
export async function addProduct(data: ProductData) {
    // Intentamos agregar el producto.
    try {
        // Validamos los datos con DraftProductSchema.
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        // Si la validación fue exitosa.
        if(result.success) {
            // Construimos la URL a la API.
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            // Enviamos la petición POST a la API con los datos validados.
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            // Si la validación falla, lanzamos un error.
            throw new Error('Datos no validos.')
        }
    } catch (error) {
        // Si ocurre algún error, lo mostramos en consola.
        console.error(error)
    }
}

// Función para obtener todos los productos.
export async function getProducts(): Promise<Product[]> {
    // Intentamos obtener los productos.
    try {
        // Construimos la URL a la API.
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        // Hacemos la petición GET a la API.
        const { data } = await axios(url)
        // Validamos los datos con ProductsSchema.
        const result = safeParse(ProductsSchema, data.data)
        // Si la validación es exitosa, retornamos el resultado.
        if(result.success) {
            return result.output
        } else {
            // Si la validación falla, lanzamos un error.
            throw new Error('Hubo un error en la validación de productos...')
        }
    } catch (error) {
        // Si ocurre un error lo mostramos en consola y retornamos un arreglo vacío.
        console.error(error)
        return [] // Retornamos un arreglo vacío para evitar undefined.
    }
}

// Función para obtener un producto por su id.
export async function getProductById(id: Product['id']): Promise<Product | undefined> {
    // Intentamos obtener el producto por id.
    try {
        // Construimos la URL a la API.
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        // Hacemos la petición GET a la API.
        const { data } = await axios(url)
        // Validamos el dato con ProductSchema.
        const result = safeParse(ProductSchema, data.data)
        // Si es exitoso, retornamos el producto.
        if(result.success) {
            return result.output
        } else {
            // Si falla, lanzamos un error.
            throw new Error('Hubo un error en la validación del producto...')
        }
    } catch (error) {
        // Si ocurre un error, lo mostramos en consola.
        console.error(error)
    }
}

// Función para actualizar un producto.
export async function updateProduct(data : ProductData, id : Product['id']) {
    // Intentamos actualizar el producto.
    try {
        // Creamos un esquema NumberSchema para parsear el precio.
        const NumberSchema = coerce(number(), Number)

        // Validamos y construimos el producto a partir de los datos recibidos.
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        // Si la validación es exitosa, hacemos el PUT a la API.
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        // Si ocurre un error, lo mostramos en consola.
        console.log(error)
    }
}

// Función para eliminar un producto.
export async function deleteProduct(id: Product['id']) {
    // Intentamos eliminar el producto.
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        // Si ocurre un error, lo mostramos en consola.
        console.log(error)
    }
}

// Función para actualizar la disponibilidad de un producto.
export async function updateProductAvailability(id: Product['id']) {
    // Intentamos actualizar la disponibilidad.
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        // Si ocurre un error, lo mostramos en consola.
        console.log(error)
    }
}
