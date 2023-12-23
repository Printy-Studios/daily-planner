//Core
import { useState } from 'react';

export default function usePage() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    return {
        pageState: {
            error,
            setError,
            loading,
            setLoading
        }
    }
}