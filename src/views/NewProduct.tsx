// Importamos las dependencias necesarias.
import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

// Action para agregar un nuevo producto.
export async function action({request} : ActionFunctionArgs) {
    // Obtenemos los datos del formulario.
    const data = Object.fromEntries(await request.formData())
    
    // Validamos que no haya campos vacíos.
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }

    // Agregamos el producto.
    await addProduct(data)

    // Redirigimos a la página principal.
    return redirect('/')
}

export default function NewProduct() {
    // Obtenemos el error, si existe.
    const error = useActionData() as string

    return (
        <>
            {/* Encabezado de la página */}
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Registrar Producto</h2>
                <Link
                    to="/"
                    className='rounded-md bg-blue-500 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-600'
                >
                    Volver a Productos
                </Link>
            </div>

            {/* Mostramos el error si existe */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {/* Formulario para registrar un nuevo producto */}
            <Form
                className="mt-10"     
                method='POST'
            >
                {/* Reutilizamos el formulario del producto */}
                <ProductForm />

                {/* Botón para registrar el producto */}
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        
        </>
    )
}
