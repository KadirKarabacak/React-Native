import { icons } from "@/constants";
import { pRegular } from "@/constants/fonts";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

interface FormFieldTypes {
    title?: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles?: object;
    keyboardType?: string;
    placeholder?: string;
    initialQuery?: string | string[];
}

const SearchInput = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    keyboardType,
    placeholder,
    initialQuery,
}: FormFieldTypes) => {
    const pathname = usePathname();
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState(initialQuery || "");

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
                value={query}
                placeholder={placeholder}
                placeholderTextColor="#CDCDE0"
                onChangeText={e => setQuery(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity
                style={{ position: "absolute", right: 15 }}
                onPress={() => {
                    if (!query)
                        return Alert.alert(
                            "Missing query",
                            "Please input something to search"
                        );
                    if (pathname.startsWith("/search"))
                        router.setParams({ query });
                    else router.push(`/search/${query}`);
                }}
            >
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
