import { icons } from "@/constants";
import { pRegular, pSemibold } from "@/constants/fonts";
import { useGlobalContext } from "@/context/GlobalProvider";
import { addBookmark, removeBookmark } from "@/lib/appwrite";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import WebView from "react-native-webview";
import RenderLoading from "./RenderLoading";

interface CreatorTypes {
    username: string;
    avatar: string;
}

interface CardTypes {
    title: string;
    thumbnail: string;
    video: string;
    creator: CreatorTypes;
    $id: string;
}

interface VideoTypes {
    video: CardTypes;
}

const isEmbeddedVideo = (url: string) => {
    return url.includes("youtube.com") || url.includes("vimeo.com");
};

const VideoCard = ({
    video: {
        title,
        thumbnail,
        video,
        creator: { username, avatar },
        $id,
    },
}: VideoTypes) => {
    const [play, setPlay] = useState(false);
    const isEmbedded = isEmbeddedVideo(video);
    const { user, setUser } = useGlobalContext();
    const [isBookmarked, setIsBookmarked] = useState(
        user?.bookmarkedVideos?.includes($id)
    );
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayBackStatus = async (status: any) => {
        if (status.isPlaying) setIsPlaying(true);
        if (!status.isPlaying) setIsPlaying(false);
        if (status.isLoaded) setIsLoaded(true);
        if (status.isLoaded && !status.isPlaying) {
            // Video yüklendiyse ve oynamıyorsa, otomatik başlat
            await videoRef?.current?.playAsync();
        }

        if (status.didJustFinish) {
            setPlay(false);
        }
    };

    useEffect(() => {
        setIsBookmarked(user?.bookmarkedVideos?.includes($id));
    }, [user?.bookmarkedVideos, $id]);

    const handleToggleBookmark = async () => {
        if (!isBookmarked) {
            await addBookmark($id);
            setIsBookmarked(true);
            setUser({
                ...user,
                bookmarkedVideos: [...user?.bookmarkedVideos, $id],
            });
        } else {
            await removeBookmark($id);
            setIsBookmarked(false);
            setUser({
                ...user,
                bookmarkedVideos: user?.bookmarkedVideos.filter(
                    (videoId: string) => videoId !== $id
                ),
            });
        }
    };

    return (
        <View
            style={{
                flexDirection: "column",
                alignItems: "center",
                paddingLeft: 16,
                paddingRight: 16,
                marginBottom: 15,
                gap: 5,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 3,
                    alignItems: "flex-start",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            width: 46,
                            height: 46,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#FF9C01",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 2,
                            paddingRight: 2,
                        }}
                    >
                        <Image
                            source={{ uri: avatar }}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 10,
                                resizeMode: "cover",
                            }}
                        />
                    </View>

                    <View
                        style={{
                            justifyContent: "center",
                            flex: 1,
                            marginLeft: 10,
                            rowGap: 4,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: pSemibold,
                                color: "white",
                                fontSize: 12,
                                lineHeight: 18,
                            }}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text
                            style={{
                                fontSize: 10,
                                lineHeight: 12,
                                fontFamily: pRegular,
                                color: "rgb(243 244 246)",
                            }}
                            numberOfLines={1}
                        >
                            {username}
                        </Text>
                    </View>
                </View>
                {/*  */}

                <View style={{ paddingTop: 6, flexDirection: "row", gap: 8 }}>
                    {/* Onpress update videos as bookmarked with a relation to user in appwrite */}
                    <TouchableOpacity onPress={handleToggleBookmark}>
                        {!isBookmarked ? (
                            <Image
                                source={icons.bookmark}
                                style={{ height: 30, width: 30 }}
                                resizeMode="contain"
                            />
                        ) : (
                            <Image
                                source={icons.bookmarkActive}
                                style={{ height: 30, width: 30 }}
                                resizeMode="contain"
                            />
                        )}
                    </TouchableOpacity>
                    {/* Onpress open menu to inspect details about video */}
                    <TouchableOpacity>
                        <Image
                            source={icons.menu}
                            style={{ height: 30, width: 30 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {play ? (
                isEmbedded ? (
                    <View
                        style={{
                            width: "100%",
                            height: 300,
                            marginTop: 15,
                            borderRadius: 20,
                            overflow: "hidden", // Border radius'un uygulanabilmesi için gerekli
                        }}
                    >
                        <WebView
                            source={{ uri: video, baseUrl: video }}
                            style={{
                                flex: 1,
                                width: "100%",
                                height: 300,
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
                            renderLoading={() => (
                                <RenderLoading
                                    size="large"
                                    containerStyles={{
                                        backgroundColor:
                                            "rgba(255,255,255,0.8)",
                                    }}
                                />
                            )}
                        />
                    </View>
                ) : (
                    <>
                        <Video
                            ref={videoRef}
                            source={{ uri: video }}
                            style={{
                                width: "100%",
                                height: 300,
                                borderRadius: 20,
                                marginTop: 15,
                                position: "relative",
                            }}
                            // onLoadStart={() => setIsPreloading(true)}
                            // onReadyForDisplay={() => setIsPreloading(false)}
                            useNativeControls
                            resizeMode={ResizeMode.COVER}
                            shouldPlay
                            isLooping
                            onPlaybackStatusUpdate={handlePlayBackStatus}
                            onError={error => {
                                console.error("Video error:", error);
                                setPlay(false);
                            }}
                        />
                        {/* Show loader while video is loading or isn't playing */}
                        {(!isLoaded || !isPlaying) && (
                            <RenderLoading
                                size="large"
                                // containerStyles={{
                                //     backgroundColor: "rgba(255,255,255,0.8)",
                                // }}
                            />
                        )}
                    </>
                )
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    style={{
                        width: "100%",
                        height: 300,
                        borderRadius: 20,
                        marginTop: 4,
                        marginBottom: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        style={{
                            width: "100%",
                            height: "100%",
                            marginTop: 8,
                            borderRadius: 20,
                        }}
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        style={{
                            width: 65,
                            height: 65,
                            position: "absolute",
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
