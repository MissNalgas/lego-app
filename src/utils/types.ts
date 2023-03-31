export interface Product {
    id: number;
    name: string;
    unit_price: number;
    stock: number;
    image: string;
}

export interface ProductDetail {
    name: string;
    unit_price: number;
    stock: number;
    description: string;
    image: string;
}