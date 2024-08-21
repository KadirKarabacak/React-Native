import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import { icons } from "../../constants";
import { pRegular, pSemibold } from "@/constants/fonts";

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                style={{ width: 24, height: 24 }}
            />
            <Text
                style={{
                    fontFamily: focused ? pSemibold : pRegular,
                    fontSize: 11,
                    color: color,
                }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FFA001",
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarStyle: {
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        height: 84,
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                focused={focused}
                                name="Home"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: "Bookmark",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                focused={focused}
                                name="Bookmark"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                focused={focused}
                                name="Create"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                focused={focused}
                                name="Profile"
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
