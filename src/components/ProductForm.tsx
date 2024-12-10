// Importamos el tipo Product.
import { Product } from "../types/types"

type ProductFormProps = {
    product?: Product
}

// Este componente muestra el formulario para crear/editar un producto.
// Incluye campos para el nombre y el precio.
export default function ProductForm({product} : ProductFormProps) {
    return (
        <>
            {/* Campo para el nombre del producto */}
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >
                    Nombre Producto:
                </label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>

            {/* Campo para el precio del producto */}
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >
                    Precio:
                </label>
                <input 
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio del Producto"
                    name="price"
                    defaultValue={product?.price}
                />
            </div>
        </>
    )
}
