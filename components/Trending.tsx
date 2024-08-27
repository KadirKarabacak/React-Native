import { icons } from "@/constants";
import React, { useState } from "react";
import { FlatList, Image, ImageBackground, Text } from "react-native";
import * as Animetable from "react-native-animatable";
import {
    GestureHandlerRootView,
    TouchableOpacity,
} from "react-native-gesture-handler";

const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
};

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);

    return (
        <Animetable.View
            style={{ marginRight: 10 }}
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Text style={{ color: "white" }}>Playing...</Text>
            ) : (
                <TouchableOpacity
                    style={{
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        style={{
                            width: 182,
                            height: 252,
                            borderRadius: 20,
                            marginTop: 10,
                            marginBottom: 10,
                            overflow: "hidden",
                            // İlk gölge
                            shadowColor: "rgba(0, 0, 0, 0.4)",
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 1, // Gölge opaklığı
                            shadowRadius: 25, // Blur radius (gölgenin bulanıklığı)
                            // İkinci gölge
                            elevation: 6, // Android için shadowOffset gibi çalışır
                        }}
                        resizeMode="cover"
                    />
                    <Image
                        style={{ width: 50, height: 50, position: "absolute" }}
                        source={icons.play}
                    />
                </TouchableOpacity>
            )}
        </Animetable.View>
    );
};

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    return (
        <FlatList
            data={posts}
            keyExtractor={item => item.$id}
            renderItem={({ item }) => (
                <GestureHandlerRootView>
                    <TrendingItem activeItem={activeItem} item={item} />
                </GestureHandlerRootView>
            )}
            horizontal
        />
    );
};

export default Trending;
