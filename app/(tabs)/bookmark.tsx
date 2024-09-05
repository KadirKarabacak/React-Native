import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { pMedium } from "@/constants/fonts";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllPosts } from "@/lib/appwrite";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
    const { user, setIsBookmarked } = useGlobalContext();
    const [bookmarkedPosts, setBookmarkedPosts] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            async function findBookedVideos() {
                const allPosts = await getAllPosts();
                const findBookmarkedPosts = allPosts.filter(post =>
                    user?.bookmarkedVideos.includes(post.$id)
                );
                setBookmarkedPosts(findBookmarkedPosts);
            }
            findBookedVideos();
        }
    }, [user?.bookmarkedVideos]);

    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            <FlatList
                data={bookmarkedPosts || []}
                // Key prop
                keyExtractor={item => String(item.$id)}
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
                        <Text
                            style={{
                                fontFamily: pMedium,
                                fontSize: 14,
                                lineHeight: 16,
                                color: "rgb(243 244 246)",
                            }}
                        >
                            Saved Videos
                        </Text>

                        <View style={{ marginTop: 15, marginBottom: 20 }}>
                            <SearchInput
                                value=""
                                handleChangeText={() => {}}
                                placeholder="Search your saved videos"
                                initialQuery={""}
                            />
                        </View>
                    </View>
                )}
                // Render when list is empty
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle={`You are not saved any video yet`}
                        // shouldDisplayButton={false}
                        buttonTitle="Start Bookmarking"
                        redirectPath="/home"
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Bookmark;
