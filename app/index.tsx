import { Href, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { pBlack } from "../constants/fonts";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            <Text style={{ fontSize: 20, fontFamily: pBlack }}>Aora!</Text>
            <StatusBar style="auto" />
            <Link href={"/home" as Href<string>} style={{ color: "blue" }}>
                Home{" "}
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({});
