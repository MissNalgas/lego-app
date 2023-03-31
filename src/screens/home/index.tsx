import React, { useMemo } from "react";
import { View, Button, Text } from '@components/atoms';
import { getAuth, signOut } from "firebase/auth";
import useAuth from "@utils/hooks/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { ShopItem } from "@components/molecules";
import styles from "./styles";
import useTheme from "@utils/hooks/useTheme";
import useStore from "@utils/hooks/useStore";
import { fMoney } from "@utils/string";

export default function HomeScreen() : JSX.Element {

    const insets = useSafeAreaInsets();
    const user = useAuth();
    const {products, cart, buy, cartProducts} = useStore();
    const theme = useTheme();

    const onSignOut = () => {
        const auth = getAuth();
        signOut(auth);
    }

    const totalPrice = useMemo(() => {
        return cartProducts.reduce((productA, productB) => productA + productB.unit_price, 0);
    }, [products, cart]);

    if (!user) return <></>;
    return (
        <View style={{flex: 1}}>
            <View style={[styles.cart, {backgroundColor: theme.cardColor, paddingTop: insets.top + 16}]}>
                <Button onPress={() => onSignOut()} title="Sign out"/>
                <Text>Total: {fMoney(totalPrice)}</Text>
                <Button onPress={() => buy()} title="buy"/>
            </View>
            <FlatList
                style={{flex: 1}}
                data={products}
                renderItem={({item}) => <ShopItem product={item}/>}
                keyExtractor={(item) => String(item.id)}
            />
        </View>
    );
}
