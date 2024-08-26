import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { pRegular } from "@/constants/fonts";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
    const { height } = Dimensions.get("window");
    const vh = height / 100; // 1vh 1% of windows height
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            {/* Our content can be larger than for different devices, so we must use scrollview */}
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View
                    style={{
                        width: "100%",
                        minHeight: 85 * vh,
                        alignItems: "center",
                        paddingLeft: 16,
                        paddingRight: 16,
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    <Image
                        style={{ width: 130, height: 84 }}
                        source={images.logo}
                        resizeMode="contain"
                    />
                    <Image
                        style={{ width: "100%", height: 300, maxWidth: 380 }}
                        source={images.cards}
                        resizeMode="contain"
                    />
                    <View style={{ position: "relative", marginTop: 20 }}>
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "bold",
                                textAlign: "center",
                                fontSize: 30,
                                lineHeight: 36,
                            }}
                        >
                            Discover endless possibilities with{" "}
                            <Text style={{ color: "#FF8E01" }}>Aora</Text>{" "}
                        </Text>
                        <Image
                            style={{
                                width: 136,
                                height: 15,
                                position: "absolute",
                                bottom: -4,
                                right: -22,
                            }}
                            source={images.path}
                            resizeMode="contain"
                        />
                    </View>
                    <Text
                        style={{
                            fontFamily: pRegular,
                            color: "#CDCDE0",
                            textAlign: "center",
                            fontSize: 14,
                            lineHeight: 20,
                            marginTop: 28,
                        }}
                    >
                        Where creativity meets innovation: embark on a journey
                        of limitless exploration with Aora
                    </Text>
                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => router.push("/sign-in")}
                        containerStyles={{ width: "100%", marginTop: 28 }}
                        isLoading={false}
                        textStyles={{}}
                    />
                </View>
            </ScrollView>
            {/* Makes phone's status bar visible */}
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
}
