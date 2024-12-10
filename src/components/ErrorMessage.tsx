import React from 'react'

type ErrorMessageProps = {
    children: React.ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
    return (
        <div className="bg-red-600 text-white p-3 text-center font-bold mb-5 rounded-md">
            {children}
        </div>
    )
}
