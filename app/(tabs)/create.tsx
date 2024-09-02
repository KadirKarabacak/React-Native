import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { pMedium, pSemibold } from "@/constants/fonts";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";

const Create = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
    });
    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            <ScrollView
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginTop: 24,
                    marginBottom: 24,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontFamily: pSemibold,
                        fontSize: 20,
                        lineHeight: 30,
                    }}
                >
                    Upload Video
                </Text>
                <FormField
                    title="Video Title"
                    value={form.title}
                    placeholder="Give your video a catch title..."
                    handleChangeText={e => setForm({ ...form, title: e })}
                    otherStyles={{ marginTop: 30 }}
                />
                <View style={{ marginTop: 20 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            lineHeight: 20,
                            color: "#CDCDE0",
                            fontFamily: pMedium,
                        }}
                    >
                        Upload Video
                    </Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        {form?.video ? (
                            <Video resizeMode={ResizeMode.CONTAIN} />
                        ) : (
                            <View
                                style={{
                                    width: "100%",
                                    height: 140,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    backgroundColor: "#1E1E2D",
                                    marginTop: 15,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // backgroundColor:
                                }}
                            >
                                {/* Create Inside Div Line 44 in video --- */}
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderWidth: 1,
                                        borderStyle: "dashed",
                                        borderColor: "#FF9001",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        style={{
                                            width: "70%",
                                            height: "70%",
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;
