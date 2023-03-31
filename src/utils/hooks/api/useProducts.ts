import { getProducts } from "@utils/api";
import { Product } from "@utils/types";
import { useEffect, useState } from "react";

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(products => setProducts(products)).catch(console.error);
    }, []);

    return products;
}