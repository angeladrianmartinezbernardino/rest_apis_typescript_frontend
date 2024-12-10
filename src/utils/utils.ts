// Ejemplo de utilidad formarCurrency (asumiendo que la tienes implementada).
export function formarCurrency(value: number): string {
    return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

// Función para convertir valores tipo string a boolean.
export function toBoolean(value: string): boolean {
    return value === 'true';
}
