// Importamos las dependencias necesarias.
import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductById, updateProduct } from "../services/ProductService"
import { Product } from "../types/types"
import ProductForm from "../components/ProductForm"


// Loader para obtener el producto por ID antes de renderizar el componente.
export async function loader({params} : LoaderFunctionArgs) {
    // Verificamos que haya un params.id.
    if(params.id !== undefined) {
        // Obtenemos el producto por ID.
        const product =  await getProductById(+params.id)
        // Si no existe el producto, redirigimos a la página principal.
        if(!product) {
            return redirect('/')
        }
        // Si existe, lo retornamos.
        return product
    }
}


// Action para actualizar el producto.
export async function action({request, params} : ActionFunctionArgs) {
    // Obtenemos los datos del formulario.
    const data = Object.fromEntries(await request.formData())
    
    // Validamos que no haya campos vacíos.
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        // Si hay error, lo retornamos.
        return error
    }

    // Si todo está bien, actualizamos el producto.
    if(params.id !== undefined) {
        await updateProduct(data, +params.id)
        return redirect('/')
    }
}

// Opciones para la disponibilidad.
const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

export default function EditProduct() {
    // Obtenemos el producto del loader.
    const product = useLoaderData() as Product
    // Obtenemos el error, si existe, del action.
    const error = useActionData() as string
    
    return (
        <>
            {/* Encabezado de la página */}
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
                <Link
                    to="/"
                    className='rounded-md bg-blue-500 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-600'
                >
                    Volver a Productos
                </Link>
            </div>

            {/* Mostramos el error si existe */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {/* Formulario para editar el producto */}
            <Form
                className="mt-10"     
                method='POST'
            >

                {/* Reutilizamos el formulario del producto */}
                <ProductForm
                    product={product}
                />
            
                {/* Campo para la disponibilidad */}
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >
                        Disponibilidad:
                    </label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                         <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                {/* Botón para guardar cambios */}
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardas cambios"
                />
            </Form>
        
        </>
    )
}
