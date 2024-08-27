import { icons } from "@/constants";
import { pRegular, pSemibold } from "@/constants/fonts";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// interface CreatorTypes {
//     username: string;
//     avatar: string;
// }

// interface VideoTypes {
//     title: string;
//     thumbnail: string;
//     video: string;
//     creator: CreatorTypes;
// }

// interface VideoCardTypes {
//     video: VideoTypes;
// }

const VideoCard = ({
    video: {
        title,
        thumbnail,
        video,
        creator: { username, avatar },
    },
}) => {
    const [play, setPlay] = useState(false);
    return (
        <View
            style={{
                flexDirection: "column",
                alingItems: "center",
                paddingLeft: 16,
                paddingRight: 16,
                marginBottom: 15,
                // gap: 5,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 3,
                    alightItems: "start",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alingItems: "center",
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
                <View style={{ paddingTop: 6 }}>
                    <Image
                        source={icons.menu}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
            {play ? (
                <Text style={{ color: "white" }}>Playing...</Text>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    style={{
                        width: "100%",
                        height: 400,
                        borderRadius: 10,
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
                            borderRadius: 10,
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
