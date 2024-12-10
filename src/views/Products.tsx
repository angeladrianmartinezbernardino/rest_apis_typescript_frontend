// Importamos las dependencias necesarias.
import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';
import { getProducts, updateProductAvailability } from '../services/ProductService';
import ProductDetails from '../components/ProductDetails';
import { Product } from '../types/types';

// Loader para obtener productos antes de renderizar el componente.
export async function loader() {
    const products = await getProducts(); // Llama a la API para obtener los productos.
    return products; // Siempre devolverá un arreglo, incluso si está vacío.
}

// Action para actualizar la disponibilidad de un producto.
export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    await updateProductAvailability(+data.id); // Actualiza disponibilidad.
    return {};
}

// Componente principal para mostrar productos.
export default function Products() {
    const products = useLoaderData() as Product[]; // Obtiene los productos del loader.

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link
                    to="productos/nuevo"
                    className="rounded-md bg-blue-500 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-600"
                >
                    Agregar Producto
                </Link>
            </div>

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
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductDetails key={product.id} product={product} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center text-gray-500">
                                    No hay productos disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
