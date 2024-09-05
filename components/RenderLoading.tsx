import React from "react";
import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

interface LoadingTypes {
    containerStyles?: object;
    size?: number | "small" | "large" | undefined;
}

const RenderLoading = ({ containerStyles, size }: LoadingTypes) => {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                ...containerStyles,
            }}
        >
            <ActivityIndicator
                size={size}
                color="#FF9C01"
                style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    borderRadius: 50,
                    width: 60,
                    height: 60,
                }}
            />
        </View>
    );
};

export default RenderLoading;
