import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        margin: 8,
        borderRadius: 8,
        padding: 10,
        elevation: 5,
        shadowColor: '#00000035',
        shadowOpacity: 0.2
    },
    image: {
        width: '100%',
        height: 300,
        alignSelf: 'center',
        borderRadius: 8
    },
    name: {
        fontSize: 18,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    buyButton: {
        gap: 0,
        paddingHorizontal: 5,
        marginVertical: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});