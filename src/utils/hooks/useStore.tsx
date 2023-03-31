import { buyProducts, getProducts } from '@utils/api';
import { fMoney } from '@utils/string';
import { Product } from '@utils/types';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Alert } from 'react-native';

const storeError = new Error('Make sure the component is a child of StoreProvider')

const storeContext = createContext<StoreType>({
    products: [], 
    cart: [], 
    setCart() {throw storeError}, 
    buy() { throw storeError },
    cartProducts: []
});

export default function useStore() {
    return useContext(storeContext);
}

type CartReducer = (state: number[], action: number) => number[];


export function StoreProvider({children} : {children: React.ReactNode}) {

    const [products, setProducts] = useState<Product[]>([]);
    const reducer :  CartReducer = (state, action) => {
        if (action === -1) return [];
        const count = state.filter(id => id === action).length;
        const stock = products.find(product => product.id === action)?.stock || 0;

        if (count + 1 > stock) {
            Alert.alert('Not enough stock');
            return state;
        } else {
            Alert.alert('Item added to cart!');
            return [...state, action];
        }
    }
    const [cart, setCart] = useReducer<CartReducer>(reducer, []);

    const cartProducts = useMemo(() => {
        return cart.map(id => products.find(product => product.id === id)).filter(product => product !== undefined) as Product[]
    }, [cart, products]);

    useEffect(() => {
        getProducts().then(result => setProducts(result)).catch(console.error);
    }, []);


    const buy = useCallback(() => {
        if (!cart.length) return Alert.alert('Add items to your shopping cart!');

        const listProducts = cartProducts.reduce((a,b) => `${a}\n-${b.name}`, '');
        const total = cartProducts.reduce((a,b) => a + (b.unit_price || 0), 0);

        const confirm = () => {
            buyProducts().then(result => {
                setProducts(result.products);
                Alert.alert(`Congratulations!\n\nThe order is on its way!`);
                setCart(-1);
            });
        }
        
        const cancel = () => {

        }

        Alert.alert('Verify your purchase', `Your order:\n\n${listProducts}\n\nTotal: ${fMoney(total)}`, [{text: 'Cancel', onPress: cancel}, {text: 'Confirm', onPress: confirm}]);
    }, [cartProducts]);


    return (
        <storeContext.Provider value={{products, cart, setCart, buy, cartProducts}}>
            {children}
        </storeContext.Provider>
    );
}

interface StoreType {
    products: Product[];
    cartProducts: Product[];
    cart: number[];
    setCart: React.Dispatch<number>;
    buy: () => void;
}