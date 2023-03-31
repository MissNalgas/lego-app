import React from "react";
import { TouchableOpacity } from 'react-native';
import Text from '@components/atoms/text';
import styles from "./styles";
import useTheme from "@utils/hooks/useTheme";

export default function Button({title, onPress, disabled} : ButtonProps) {

    const theme = useTheme();

    return (
        <TouchableOpacity disabled={disabled} activeOpacity={0.8} style={[styles.container, {backgroundColor: theme.accentColor}]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

interface ButtonProps {
    title?: string;
    onPress?: () => void;
    disabled?: boolean;
}