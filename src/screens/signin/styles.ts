import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        flex: 1
    },
    header: {
        paddingVertical: 32
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    form: {
        paddingVertical: 16,
        gap: 16,
        paddingHorizontal: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})