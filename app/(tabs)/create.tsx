import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { pMedium, pSemibold } from "@/constants/fonts";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
    const [isUploading, setIsUploading] = useState(false);
    const { user } = useGlobalContext();
    const [form, setForm] = useState({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
    });

    // Open pickers to select image | videos to upload database using [ expo-document-picker ]
    const openPicker = async (selectType: string) => {
        // const result = await DocumentPicker.getDocumentAsync({
        //     type:
        //         selectType === "image" ? "image/*" : ["video/mp4", "video/gif"],
        // });
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:
                selectType === "image"
                    ? ImagePicker.MediaTypeOptions.Images
                    : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (selectType === "image")
                setForm({ ...form, thumbnail: result?.assets[0] });
            if (selectType === "video")
                setForm({ ...form, video: result?.assets[0] });
        }
    };

    const submit = async () => {
        if (!form.prompt || !form.thumbnail || !form.title || !form.video)
            return Alert.alert("Please fill all the fields");
        setIsUploading(true);

        try {
            await createVideo({ ...form, userId: user.$id });
            Alert.alert("Success", "Video uploaded successfully");
            router.push("/home");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setIsUploading(false);
            // setForm({ title: "", video: null, thumbnail: null, prompt: "" });
        }
    };
    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            <ScrollView
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginTop: 10,
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontFamily: pSemibold,
                        fontSize: 18,
                        lineHeight: 25,
                    }}
                >
                    Upload Video
                </Text>
                <FormField
                    title="Video Title"
                    value={form.title}
                    placeholder="Give your video a catch title..."
                    handleChangeText={e => setForm({ ...form, title: e })}
                    otherStyles={{ marginTop: 15 }}
                />
                <View style={{ marginTop: 15 }}>
                    <Text
                        style={{
                            fontFamily: pMedium,
                            color: "#CDCDE0",
                            fontSize: 16,
                            lineHeight: 20,
                            marginBottom: 5,
                        }}
                    >
                        Upload Video
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => openPicker("video")}
                    >
                        {form?.video ? (
                            <Video
                                source={{ uri: form.video.uri }}
                                resizeMode={ResizeMode.COVER}
                                style={{
                                    width: "100%",
                                    height: 220,
                                    borderRadius: 10,
                                }}
                                useNativeControls
                                isLooping
                            />
                        ) : (
                            <View
                                style={{
                                    width: "100%",
                                    height: 140,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    backgroundColor: "#1E1E2D",
                                    marginTop: 10,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
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
                <View style={{ marginTop: 15 }}>
                    <Text
                        style={{
                            fontFamily: pMedium,
                            color: "#CDCDE0",
                            fontSize: 16,
                            lineHeight: 24,
                            marginBottom: 5,
                        }}
                    >
                        Thumbnail Image
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => openPicker("image")}
                    >
                        {form?.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail.uri }}
                                resizeMode="cover"
                                style={{
                                    width: "100%",
                                    height: 200,
                                    borderRadius: 10,
                                }}
                            />
                        ) : (
                            <View
                                style={{
                                    width: "100%",
                                    height: 70,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    backgroundColor: "#1E1E2D",
                                    marginTop: 15,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 2,
                                    borderColor: "#232533",
                                    flexDirection: "row",
                                    gap: 10,
                                }}
                            >
                                <Image
                                    source={icons.upload}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />

                                <Text
                                    style={{
                                        fontFamily: pMedium,
                                        color: "#CDCDE0",
                                        fontSize: 14,
                                        lineHeight: 24,
                                    }}
                                >
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <FormField
                    title="AI Prompt"
                    value={form.prompt}
                    placeholder=""
                    handleChangeText={e => setForm({ ...form, prompt: e })}
                    otherStyles={{ marginTop: 15 }}
                />
                <CustomButton
                    title="Submit & Publish"
                    handlePress={submit}
                    containerStyles={{ marginTop: 18, marginBottom: 10 }}
                    isLoading={isUploading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;
