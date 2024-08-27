import { icons } from "@/constants";
import { pRegular } from "@/constants/fonts";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

interface FormFieldTypes {
    title?: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles?: object;
    keyboardType?: string;
    placeholder?: string;
}

const SearchInput = ({
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
        <View
            style={{
                borderWidth: 2,
                borderColor: "rgb(15 23 42)",
                backgroundColor: "rgb(15 23 42)",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                position: "relative",
            }}
        >
            <TextInput
                style={{
                    flex: 1,
                    color: "white",
                    fontFamily: pRegular,
                    fontSize: 14,
                    lineHeight: 24,
                    borderWidth: 1,
                    borderColor: isFocused ? "#FF9C01" : "#313144",
                    width: "100%",
                    backgroundColor: "#1E1E2D",
                    paddingBottom: 15,
                    paddingTop: 15,
                    paddingLeft: 15,
                    paddingRight: 10,
                    borderRadius: 10,
                    alignItems: "center",
                }}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                // For hide text eg password
                secureTextEntry={title === "Password" && !showPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity style={{ position: "absolute", right: 15 }}>
                <Image
                    source={icons.search}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
