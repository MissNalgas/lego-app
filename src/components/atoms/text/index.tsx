import useTheme from '@utils/hooks/useTheme';
import React from 'react';
import { Text, TextProps } from 'react-native';

export default function ThemedText(props : TextProps) {

    const theme = useTheme();

    return (
        <Text {...props} style={[{color: theme.textColor, fontSize: theme.fontSize, flexShrink: 1}, props.style]}/>
    );
}