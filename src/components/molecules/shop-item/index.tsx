import React, { useEffect, useState } from "react";
import { View, Text, Button } from "@components/atoms";
import { View as NativeView, TouchableOpacity, Image } from 'react-native';
import { Product } from "@utils/types";
import { memo } from "react";
import styles from "./styles";
import useTheme from "@utils/hooks/useTheme";
import { fMoney } from "@utils/string";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "App";
import useStore from "@utils/hooks/useStore";
import { SharedElement } from "react-navigation-shared-element";
import { proxy } from "@utils/image";

type NavigationProps = StackNavigationProp<StackParamList, 'Home'>

function ShopItem({product} : ShopItemProps) {

    const theme = useTheme();
    const navigation = useNavigation<NavigationProps>();
    const { setCart } = useStore();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(300);

    useEffect(() => {
        if (!width) return;

        setHeight(width * (4/6));

    }, [width]);


    
    return (
        <View style={[styles.container, {backgroundColor: theme.cardColor}]}>
            <TouchableOpacity onPress={() => navigation.push('Detail', {product})} activeOpacity={0.8}>
                <SharedElement id={product.image}>
                    <Image
                        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
                        style={[styles.image, {height}]}
                        source={{uri: proxy(product.image)}}
                        resizeMode='contain'
                    />
                </SharedElement>
            </TouchableOpacity>
            <NativeView>
                <NativeView style={styles.buyButton}>
                    <NativeView style={styles.header}>
                        <Text style={styles.name}>{product.name}</Text>
                        <Text style={styles.name}>In stock: {product.stock}</Text>
                    </NativeView>
                    <Text style={styles.price}>{fMoney(product.unit_price)}</Text>
                </NativeView>
                <Button onPress={() => setCart(product.id)} title='Add to shopping cart'/>
            </NativeView>
        </View>
    );
}

export default memo(ShopItem)

interface ShopItemProps {
    product: Product;
}