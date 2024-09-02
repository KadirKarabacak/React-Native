import { View, Text } from "react-native";
import React from "react";
import { pRegular, pSemibold } from "@/constants/fonts";

interface InfoBoxTypes {
    title: string;
    subtitle: string;
    containerStyles?: object;
    titleStyles?: object;
}

const InfoBox = ({
    title,
    subtitle,
    containerStyles,
    titleStyles,
}: InfoBoxTypes) => {
    return (
        <View style={{ ...containerStyles }}>
            <Text
                style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: pSemibold,
                    ...titleStyles,
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                    fontSize: 12,
                    lineHeight: 16,
                    textAlign: "center",
                    fontFamily: pRegular,
                    color: "#ffffffcc",
                }}
            >
                {subtitle}
            </Text>
        </View>
    );
};

export default InfoBox;
