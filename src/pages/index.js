import React from "react";
import { useRouter } from 'next/router'; 
import useAuth from "../hooks/useAuth";

export default function Home() {
    const router = useRouter();
    useAuth()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Digicare4u Web App</h1>
            <button 
                onClick={() => router.push('/login')} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Login Here!
            </button>
        </div>
    );
}

