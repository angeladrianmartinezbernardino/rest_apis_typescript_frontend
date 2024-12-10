// Importamos las dependencias necesarias.
import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'
import { Product } from "../types/types"
import { formarCurrency } from "../utils/utils"
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
    product: Product
}

// Acción para eliminar un producto.
export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product} : ProductDetailsProps) {

    // Creamos un fetcher para actualizar la disponibilidad.
    const fetcher = useFetcher()
    // Hook para navegar a otra ruta.
    const navigate = useNavigate()
    // Verificamos la disponibilidad del producto.
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            {/* Celda del nombre del producto */}
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>

            {/* Celda del precio del producto */}
            <td className="p-3 text-lg text-gray-800">
                { formarCurrency(product.price)}
            </td>

            {/* Celda de la disponibilidad (con botón para cambiar estado) */}
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method='POST'>
                    {/* Este botón envía el ID del producto para actualizar su disponibilidad */}
                    <button
                        type='submit'
                        name='id'
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} 
                        rounded-lg p-2 text-xs uppercase font-bold w-full border
                        border-black-100 hover:cursor-pointer`}
                    >
                    {isAvailable ? 'Disponible' : 'No disponible'}
                    </button>
                </fetcher.Form>
            </td>

            {/* Celda de acciones (Editar y Eliminar) */}
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    {/* Botón para editar el producto */}
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >
                        Editar
                    </button>

                    {/* Formulario para eliminar el producto */}
                    <Form
                        className='w-full'
                        method='POST'
                        action={`/productos/${product.id}/eliminar`}
                        onSubmit={ (e) => {
                            // Confirmamos la eliminación del producto.
                            if(!confirm('¿Deseas Eliminar este producto?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input type='submit'
                        value='Eliminar'
                        className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
