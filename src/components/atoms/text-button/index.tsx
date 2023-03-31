import useTheme from "@utils/hooks/useTheme";
import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "../text";
import styles from "./styles";

export default function TextButton({title, onPress} : TextButtonProps) {

    const theme = useTheme();

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <Text style={[{color: theme.accentColor}, styles.text]}>{title}</Text>
        </TouchableOpacity>
    );
}

interface TextButtonProps {
    title?: string;
    onPress?: () => void;
}