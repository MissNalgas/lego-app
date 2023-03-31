import useTheme from "@utils/hooks/useTheme";
import React from "react";
import { View, ViewProps } from "react-native";

export default function ThemedView (props : ViewProps) {

    const theme = useTheme();

    return <View {...props} style={[{backgroundColor: theme.backgroundColor}, props.style]}/>
}