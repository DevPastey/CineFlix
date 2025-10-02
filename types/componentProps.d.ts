import { ImageProps } from "react-native";

export type TabIconProps = {
    icon: ImageProps,
    focused: boolean,
    title: string,
}

export type InputTextProps = {
    onChangeText?: (text:string) => void,
    placeholder: string,
    value?: string,
    onPress: () => void,

}

