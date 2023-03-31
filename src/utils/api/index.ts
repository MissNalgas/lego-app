import { Product, ProductDetail } from "@utils/types";
import getAxios from "./axios";

export async function getProducts() {
    const axios = await getAxios();
    const response = await axios.get<{products: Product[]}>('/all-products');
    return response.data.products;
}

export async function getDetail(productId : number) {
    const axios = await getAxios();
    const response = await axios.get<ProductDetail>(`/detail/${productId}`);
    return response.data;
}

export async function buyProducts() {
    const axios = await getAxios();
    const response = await axios.post<{products: Product[]}>('/buy');
    return response.data;
}