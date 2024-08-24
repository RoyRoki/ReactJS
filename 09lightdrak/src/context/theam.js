import { useContext , createContext } from "react";



export const ThemColor = createContext({
    themMode: "light",
    darkTheam: () => {},
    lightTheam:() => {},
});

export const ThemProvider = ThemColor.Provider;

export default function useThem() {
    return useContext(ThemColor);
}