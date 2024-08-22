// import CustomButton from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { pRegular, pSemibold } from "@/constants/fonts";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
    const { height } = Dimensions.get("window");
    const vh = height / 100; // 1vh 1% of windows height
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {};
    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            <ScrollView>
                <View
                    style={{
                        width: "100%",
                        minHeight: 87 * vh,
                        // height: "100%",
                        justifyContent: "center",
                        paddingLeft: 16,
                        paddingRight: 16,
                        marginTop: 24,
                        marginBottom: 24,
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={{ width: 115, height: 35 }}
                    />
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "semibold",
                            fontFamily: pSemibold,
                            fontSize: 20,
                            marginTop: 40,
                        }}
                    >
                        Sign up to Aora
                    </Text>
                    <FormField
                        title="Username"
                        value={form.userName}
                        handleChangeText={(e: string) =>
                            setForm({ ...form, userName: e })
                        }
                        otherStyles={{ marginTop: 28 }}
                        // Important for autofill
                        // keyboardType="email-address"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e: string) =>
                            setForm({ ...form, email: e })
                        }
                        otherStyles={{ marginTop: 10 }}
                        // Important for autofill
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: string) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyles={{ marginTop: 10 }}
                    />
                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles={{ marginTop: 28 }}
                        isLoading={isSubmitting}
                    />
                    <View
                        style={{
                            justifyContent: "center",
                            paddingTop: 20,
                            flexDirection: "row",
                            gap: 8,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                lineHeight: 20,
                                fontFamily: pRegular,
                                color: "rgb(243 244 246)",
                            }}
                        >
                            Already have an account?
                        </Text>
                        <Link
                            href="/sign-in"
                            style={{
                                fontFamily: pSemibold,
                                color: "#FF9C01",
                                fontSize: 14,
                                lineHeight: 20,
                            }}
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
