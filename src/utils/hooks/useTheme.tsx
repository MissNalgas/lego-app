import React, { useContext, useState, createContext } from "react";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

const lightTheme : Theme = {
    textColor: 'black',
    backgroundColor: '#E4DCCF',
    fontSize: 16,
    accentColor: '#EA5455',
    cardColor: '#F9F5EB'
};
// const lightTheme : Theme = {
//     textColor: 'black',
//     backgroundColor: '#F9F5EB',
//     fontSize: 16,
//     accentColor: '#EA5455',
//     cardColor: '#E4DCCF'
// };

const darkTheme : Theme = {
    textColor: 'white',
    backgroundColor: '#443C68',
    fontSize: 16,
    accentColor: '#EA5455',
    cardColor: '#18122B'
};



const themeContext = createContext(lightTheme);


export default function useTheme() {
    return useContext(themeContext);
}

export function ThemeProvider({children} : {children: React.ReactNode}) {

    const scheme = useColorScheme();
    const [theme, setTheme] = useState<Theme>(scheme === 'light' ? lightTheme : darkTheme);

    useEffect(() => {
        setTheme(scheme === 'light' ? lightTheme : darkTheme)
    }, [scheme]);

    return (
        <themeContext.Provider value={theme}>
            {children}
        </themeContext.Provider>
    );
}

interface Theme {
    textColor: string;
    backgroundColor: string;
    fontSize: number;
    accentColor: string;
    cardColor: string;
}