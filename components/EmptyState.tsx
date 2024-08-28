import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import { pMedium, pSemibold } from "@/constants/fonts";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateTypes {
    title: string;
    subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateTypes) => {
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 16,
                paddingRight: 16,
            }}
        >
            <Image
                source={images.empty}
                style={{ width: 270, height: 215 }}
                resizeMode="contain"
            />
            <Text
                style={{
                    fontFamily: pSemibold,
                    fontSize: 20,
                    lineHeight: 32,
                    color: "white",
                    textAlign: "center",
                    marginTop: 2,
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                    fontFamily: pMedium,
                    fontSize: 14,
                    lineHeight: 16,
                    color: "rgb(243 244 246)",
                    marginTop: 4,
                }}
            >
                {subtitle}
            </Text>
            <CustomButton
                title="Create Video"
                handlePress={() => {
                    router.push("/create");
                }}
                containerStyles={{
                    width: "100%",
                    marginTop: 20,
                    marginBottom: 20,
                }}
            />
        </View>
    );
};

export default EmptyState;
