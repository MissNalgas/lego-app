import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('screen').width;

export default StyleSheet.create({
    container:  {
        flex: 1
    },
    image: {
        width: w,
        height: w * (4/6),
        alignSelf: 'center'
    },
    title: {
        fontSize: 30,
        marginVertical: 16,
        marginHorizontal: 16
    },
    description: {
        paddingHorizontal: 16,
        textAlign: 'justify'
    },
    buttonContainer: {
        padding: 16
    }
});