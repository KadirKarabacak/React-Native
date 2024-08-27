import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { pMedium, pSemibold } from "@/constants/fonts";

const Home = () => {
    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            <FlatList
                // Actual Data
                data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                // Key prop
                keyExtractor={item => String(item.id)}
                // Rendering item
                renderItem={({ item }) => (
                    <Text style={{ fontSize: 50, color: "white" }}>
                        {item.id}
                    </Text>
                )}
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
                                justifyContent: "space-between",
                                alignItems: "start",
                                // flexDirection: "row",
                                marginBottom: 24,
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
                                Welcome Back
                            </Text>
                            <Text
                                style={{
                                    fontFamily: pSemibold,
                                    fontSize: 24,
                                    lineHeight: 32,
                                    color: "white",
                                }}
                            >
                                Ex Reminder Test
                            </Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Home;
