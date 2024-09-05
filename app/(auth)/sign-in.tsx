// import CustomButton from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { pRegular, pSemibold } from "@/constants/fonts";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
    const { height } = Dimensions.get("window");
    const vh = height / 100; // 1vh 1% of windows height
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submit = async () => {
        // Validation for fields
        if (!form.email || !form.password) {
            Alert.alert("Error", "Please fill in all the fields");
            return;
        }

        // Loading indicator active
        setIsSubmitting(true);

        try {
            // Create user
            await signIn({
                email: form.email,
                password: form.password,
            });

            const result = await getCurrentUser();
            // Set it to global state...
            setUser(result);
            setIsLoggedIn(true);

            Alert.alert("Success", "User signed in successfully");
            // Redirect user
            router.replace("/home");
        } catch (error: any) {
            // Alert Errors
            console.log(error.message);
            Alert.alert("Error", error.message);
        } finally {
            // Loading indicator passive
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
            <ScrollView>
                <View
                    style={{
                        width: "100%",
                        minHeight: 84 * vh,
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
                        Log in to Aora
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e: string) =>
                            setForm({ ...form, email: e })
                        }
                        otherStyles={{ marginTop: 20 }}
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
                            Don't have an account?
                        </Text>
                        <Link
                            href="/sign-up"
                            style={{
                                fontFamily: pSemibold,
                                color: "#FF9C01",
                                fontSize: 14,
                                lineHeight: 20,
                            }}
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
