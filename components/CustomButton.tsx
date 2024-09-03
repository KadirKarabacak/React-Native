import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import { pSemibold } from "@/constants/fonts";

interface CustomButtonProps {
    title?: string;
    handlePress: () => void;
    containerStyles?: object;
    textStyles?: object;
    isLoading?: boolean;
}

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={{
                backgroundColor: "#FF9C01",
                borderRadius: 10,
                minHeight: 62,
                justifyContent: "center",
                alignItems: "center",
                opacity: isLoading ? 0.5 : 1,
                ...containerStyles,
            }}
            disabled={isLoading}
        >
            <Text
                style={{
                    color: "#161622",
                    fontFamily: pSemibold,
                    fontSize: 18,
                    lineHeight: 28,
                    ...textStyles,
                }}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#161622" />
                ) : (
                    title
                )}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
