// Importamos las dependencias necesarias.
import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom'
import { getProducts, updateProductAvailability } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails';
import { Product } from '../types/types';

// Loader para obtener todos los productos antes de renderizar el componente.
// Retorna un arreglo de productos. Si getProducts() falla, ahora sabemos que devolverá [].
export async function loader() {
    return await getProducts() // Esto siempre devolverá un arreglo, aunque vacío.
}

// Action para actualizar la disponibilidad de un producto.
export async function action({request} : ActionFunctionArgs) {
    // Obtenemos los datos del formulario.
    const data  = Object.fromEntries(await request.formData())
    // Actualizamos la disponibilidad del producto.
    await updateProductAvailability(+data.id)
    return {}
}

export default function Products() {
    // Obtenemos los productos del loader. Ahora products siempre será un arreglo.
    const products = useLoaderData() as Product[]

    return(
    <>
        {/* Encabezado de la página */}
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
            <Link
                to="productos/nuevo"
                className='rounded-md bg-blue-500 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-600'
            >
                Agregar Producto
            </Link>
        </div>

        {/* Tabla de productos */}
        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                    <tr>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Disponibilidad</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeamos los productos. Ahora no habrá error, pues products es [] en el peor de los casos. */}
                    {products.map(product => (
                        <ProductDetails
                            key={product.id}
                            product={product}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    </>
    )
}
