import { icons } from "@/constants";
import { pMedium, pSemibold } from "@/constants/fonts";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface FormFieldTypes {
    title: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles: object;
    keyboardType?: string;
    placeholder?: string;
}

const FormField = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    keyboardType,
    placeholder,
}: FormFieldTypes) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={{ gap: 8 }}>
            <Text
                style={{
                    fontFamily: pMedium,
                    color: "#CDCDE0",
                    fontSize: 16,
                    lineHeight: 24,
                    ...otherStyles,
                }}
            >
                {title}
            </Text>
            <View
                style={{
                    borderWidth: 2,
                    borderColor: "rgb(15 23 42)",
                    backgroundColor: "rgb(15 23 42)",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <TextInput
                    style={{
                        flex: 1,
                        color: "white",
                        fontFamily: pSemibold,
                        fontSize: 16,
                        lineHeight: 24,
                        borderWidth: 2,
                        borderColor: isFocused ? "#FF9C01" : "#313144",
                        width: "100%",
                        backgroundColor: "#1E1E2D",
                        paddingBottom: 10,
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 10,
                        alignItems: "center",
                    }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="7b7b8b"
                    onChangeText={handleChangeText}
                    // For hide text eg password
                    secureTextEntry={title === "Password" && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {title === "Password" && (
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 0,
                            paddingLeft: 5,
                            paddingRight: 10,
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor: "transparent",
                            // backgroundColor: "white",
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            style={{
                                width: 24,
                                height: 24,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
