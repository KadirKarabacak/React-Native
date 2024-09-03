import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants";
import { pMedium, pRegular, pSemibold } from "@/constants/fonts";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const { data: latestPosts } = useAppwrite(getLatestPosts);
    const { user } = useGlobalContext();

    const [refreshing, setRefreshing] = useState(false);

    // Create for <RefreshControl /> Allow user to pull screen down to refresh
    const onRefresh = async () => {
        setRefreshing(true);

        // re-call videos -> if any new video appeard
        await refetch();

        setRefreshing(false);
    };

    useEffect(() => {
        // Refetch posts whenever the bookmarkedVideos array changes
        refetch();
    }, [user.bookmarkedVideos]);

    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            <FlatList
                data={posts || []}
                // Key prop
                keyExtractor={item => String(item.thumbnail)}
                // Rendering item
                renderItem={({ item }) => <VideoCard video={item} />}
                // Header component of list
                ListHeaderComponent={() => (
                    <View
                        style={{
                            marginTop: 24,
                            marginBottom: 24,
                            paddingLeft: 16,
                            paddingRight: 16,
                        }}
                    >
                        <View
                            style={{
                                alignItems: "flex-start",
                                marginBottom: 24,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontFamily: pMedium,
                                        fontSize: 14,
                                        lineHeight: 16,
                                        color: "rgb(243 244 246)",
                                    }}
                                >
                                    Welcome back
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: pSemibold,
                                        fontSize: 22,
                                        lineHeight: 32,
                                        color: "#FF9C01",
                                    }}
                                >
                                    {user?.username}
                                </Text>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Image
                                    style={{ width: 36, height: 40 }}
                                    source={images.logoSmall}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                        <SearchInput
                            value=""
                            handleChangeText={() => {}}
                            placeholder="Search for a video topic"
                        />
                        <View
                            style={{
                                width: "100%",
                                flex: 1,
                                paddingTop: 15,
                                paddingBottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: pRegular,
                                    color: "rgb(243 244 246)",
                                    fontSize: 14,
                                    lineHeight: 28,
                                }}
                            >
                                Latest Videos
                            </Text>
                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                // Works when list is empty
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="Be the first one to upload a video"
                        redirectPath="/create"
                        buttonTitle="Create Video"
                    />
                )}
                // Allow user to refresh screen by pulling down
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default Home;
