import InfoBox from "@/components/InfoBox";
import VideoCard from "@/components/VideoCard";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { router } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    const { data: posts, isLoading } = useAppwrite(() =>
        getUserPosts(user.$id)
    );
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    // const [refreshing, setRefreshing] = useState(false);

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        router.replace("/sign-in");
    };

    if (isLoading) return <ActivityIndicator size="large" color="#FF9C01" />;

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
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,
                            marginBottom: 35,
                            paddingLeft: 16,
                            paddingRight: 16,
                        }}
                    >
                        <TouchableOpacity
                            onPress={logout}
                            style={{
                                marginBottom: 30,
                                marginTop: 10,
                                width: "100%",
                                alignItems: "flex-end",
                            }}
                        >
                            <Image
                                source={icons.logout}
                                resizeMode="contain"
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                borderWidth: 1,
                                borderColor: "#FF9C01",
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={{ uri: user?.avatar }}
                                style={{
                                    width: "90%",
                                    height: "90%",
                                    borderRadius: 12,
                                }}
                                resizeMode="cover"
                            />
                        </View>
                        <InfoBox
                            title={user?.username}
                            containerStyles={{ marginTop: 15 }}
                            titleStyles={{ fontSize: 22 }}
                            subtitle=""
                        />
                        <View style={{ flexDirection: "row" }}>
                            <InfoBox
                                title={posts.length || 0}
                                subtitle="Posts"
                                containerStyles={{ marginRight: 15 }}
                                titleStyles={{ fontSize: 18 }}
                            />
                            <InfoBox
                                title="1.2k"
                                subtitle="Followers"
                                titleStyles={{ fontSize: 18 }}
                            />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Profile;
