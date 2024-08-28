import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { FlatList, Image, ImageBackground, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
    GestureHandlerRootView,
    TouchableOpacity,
} from "react-native-gesture-handler";
import WebView from "react-native-webview";

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

const isEmbeddedVideo = (url: string) => {
    return url.includes("youtube.com") || url.includes("vimeo.com");
};

const TrendingItem = ({ activeItem, item }: { activeItem: any; item: any }) => {
    const [play, setPlay] = useState(false);
    const isEmbedded = isEmbeddedVideo(item.video);

    return (
        <Animatable.View
            style={{ marginRight: 10 }}
            animation={
                (activeItem === item.$id
                    ? zoomIn
                    : zoomOut) as Animatable.CustomAnimation
            }
            duration={500}
        >
            {play ? (
                isEmbedded ? (
                    <WebView
                        source={{ uri: item.video, baseUrl: item.video }}
                        style={{
                            flex: 1,
                            width: 182,
                            height: 252,
                            marginTop: 15,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                        allowsInlineMediaPlayback={true}
                        javaScriptEnabled={true}
                        allowsFullscreenVideo={true}
                        scalesPageToFit={true}
                        startInLoadingState={true}
                        mediaPlaybackRequiresUserAction={false}
                        onLoadProgress={syntheticEvent => {
                            const { nativeEvent } = syntheticEvent;
                            if (nativeEvent.progress == 1) setPlay(true);
                        }}
                        // onLoadStart={() => console.log("Load started")}
                        // onLoadEnd={() => setPlay(true)}
                        // onError={error => {
                        //     console.log("Error loading page:", error);
                        //     setPlay(false);
                        // }}
                        // onMessage={event =>
                        //     console.log(
                        //         "Message from webview:",
                        //         event.nativeEvent.data
                        //     )
                        // }
                    />
                ) : (
                    <Video
                        source={{ uri: item.video }}
                        style={{
                            width: 182,
                            height: 252,
                            borderRadius: 20,
                            overflow: "hidden",
                            marginTop: 15,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                        useNativeControls
                        resizeMode={ResizeMode.COVER}
                        shouldPlay
                        onPlaybackStatusUpdate={status => {
                            if (status.isLoaded) {
                                setPlay(true);
                            }
                            console.log(status);
                        }}
                        onError={error => {
                            console.error("Video error:", error);
                            setPlay(false);
                        }}
                    />
                )
            ) : (
                <TouchableOpacity
                    style={{
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 182,
                        height: 252,
                        marginTop: 10,
                        marginBottom: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }}
                    activeOpacity={0.5}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        style={{
                            width: 182,
                            height: 252,
                            marginTop: 10,
                            marginBottom: 10,
                            backgroundColor: "rgba(255, 255, 255, 0.10)",
                        }}
                        resizeMode="cover"
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flex: 1,
                            }}
                        >
                            <Image
                                source={icons.play}
                                style={{ width: 48, height: 48 }}
                                resizeMode="contain"
                            />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending = ({ posts }: { posts: any }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: any;
    }) => {
        setActiveItem(viewableItems[0].key);
    };

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
            // On swipe change the active item
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
            // contentOffset={{ x: 120 }}
        />
    );
};

export default Trending;
