import { Slot } from "expo-router";

import { View } from "react-native";

export default function Layout() {
    return (
        <View style={{ flex:1, backgroundColor: '#1D2F40' }}>
            <Slot />
        </View>
)}