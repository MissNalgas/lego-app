import { getDetail } from '@utils/api';
import { ProductDetail } from '@utils/types';
import { useState, useEffect } from 'react';

export default function useDetail(id: number) {
    const [data, setData] = useState<ProductDetail | null>(null);

    useEffect(() => {

        getDetail(id).then(result => setData(result)).catch(console.error);

    }, [id]);

    return data;
}