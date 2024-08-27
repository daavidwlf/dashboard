import { createContext, createSignal, useContext } from "solid-js";

const PopupContext = createContext();

export function PopupProvider(props:any) {
    const [popUp, setPopUp] = createSignal<any>(null);

    return (
        <PopupContext.Provider value={{ popUp, setPopUp }}>
            {props.children}
        </PopupContext.Provider>
    );
}

export function usePopup() {
    return useContext(PopupContext);
}