import React, {useRef, useEffect} from 'react';
import { ScrollView, Image, Animated } from 'react-native';
import { View, Text, Button } from '@components/atoms';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from 'App';
import styles from './styles';
import useDetail from '@utils/hooks/api/useDetail';
import useStore from '@utils/hooks/useStore';
import { SharedElement } from 'react-navigation-shared-element';
import { proxy } from '@utils/image';


type DetailScreenProps = StackScreenProps<StackParamList, 'Detail'>;

export default function DetailScreen({route: {params: {product}}} : DetailScreenProps) {

    const detail = useDetail(product.id);
    const {setCart} = useStore();
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!detail) return;

        Animated.timing(opacity, {
            toValue: 1,
            useNativeDriver: true,
            duration: 300
        }).start();

    }, [detail]);

    const addToCart = () => {
        setCart(product.id);
        // navigation.goBack();
    }

    return (
        <View style={[styles.container]}>
            <ScrollView>
                <Text style={styles.title}>{product.name}</Text>
                <SharedElement id={product.image}>
                    <Image
                        style={styles.image}
                        source={{uri: proxy(product.image)}}
                        resizeMode='contain'
                    />
                    {/* <Image
                        source={proxy(product.image)}
                        contentFit='contain'
                        style={styles.image}   
                    /> */}
                </SharedElement>
                <View style={styles.buttonContainer}>
                    <Button onPress={addToCart} title='Add to cart'/>
                </View>
                <Animated.View 
                    style={{
                        flex:  1, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        opacity
                    }}
                >
                    <Text style={styles.description}>{detail?.description || '...'}</Text>
                </Animated.View>
            </ScrollView>
        </View>
    );
}