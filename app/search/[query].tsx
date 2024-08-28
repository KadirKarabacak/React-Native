import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { pMedium, pSemibold } from "@/constants/fonts";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
    const { query } = useLocalSearchParams();
    const {
        data: posts,
        refetch,
        isLoading,
    } = useAppwrite(() => searchPosts(query));
    // const [refreshing, setRefreshing] = useState(false);
    console.log(posts);

    useEffect(() => {
        refetch();
    }, [query]);

    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            <FlatList
                data={posts}
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
                        <Text
                            style={{
                                fontFamily: pMedium,
                                fontSize: 14,
                                lineHeight: 16,
                                color: "rgb(243 244 246)",
                            }}
                        >
                            Search Results
                        </Text>
                        <Text
                            style={{
                                fontFamily: pSemibold,
                                fontSize: 24,
                                lineHeight: 32,
                                color: "white",
                            }}
                        >
                            {query}
                        </Text>
                        <View style={{ marginTop: 15, marginBottom: 20 }}>
                            <SearchInput
                                value=""
                                handleChangeText={() => {}}
                                placeholder="Search for a video topic"
                                initialQuery={query}
                            />
                        </View>
                    </View>
                )}
                // Render when list is empty
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle={`No videos found for "${query}" search query`}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Search;
