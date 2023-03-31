import React from 'react';
import View from '@components/atoms/view';
import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';
import useTheme from '@utils/hooks/useTheme';

export default function Input(props : TextInputProps) {

    const theme = useTheme();

    return (
        <View style={[styles.container, {borderColor: theme.accentColor}]}>
            <TextInput {...props} style={[{color: theme.textColor, fontSize: theme.fontSize}, props.style]}/>
        </View>
    );
}