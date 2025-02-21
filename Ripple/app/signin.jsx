import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg"; // Import SvgXml to render SVG

export default (props) => {
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.column}>
                    <View style={styles.view}>
                        <View style={styles.view2}></View>
                    </View>
                    <Image
                        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/27700429-4024-4ef2-8527-449fb5173f03" }}
                        resizeMode={"stretch"}
                        style={styles.absoluteImage2}
                    />
                </View>
                <View style={styles.column2}>
                    <View>
                        <Text style={styles.text2}>{"Ripple"}</Text>

                        
                    </View>
                    <View style={styles.absoluteColumn}>
                        <Text style={styles.text3}>{"Welcome "}</Text>
                        <Text style={styles.text4}>{"Start the Ripple, change the world"}</Text>
                        <View style={styles.view3}>
                            <TouchableOpacity style={styles.button} onPress={() => alert('Pressed!')}>
                                <Text style={styles.text5}>{"Sign up"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.view4}>
                            <TouchableOpacity style={styles.button2} onPress={() => alert('Pressed!')}>
                                <Text style={styles.text5}>{"Log In"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.view5}>
                            <Text style={styles.text6}>{"Or Sign In with"}</Text>
                        </View>
                        <View style={styles.view6}>
                            <View style={styles.row}>
                                <Image
                                    source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e88fc034-c7c3-4ebb-b63a-3021c95dc604" }}
                                    resizeMode={"stretch"}
                                    style={styles.image2}
                                />
                                <Image
                                    source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cb655e3f-3bcf-47a7-aeed-cb79608ab556" }}
                                    resizeMode={"stretch"}
                                    style={styles.image2}
                                />
                                <Image
                                    source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d3d0830a-d38b-442a-b404-fb60637ed1b4" }}
                                    resizeMode={"stretch"}
                                    style={styles.image3}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 230,  // Adds some bottom space to ensure content doesn't get cut off
    },
    absoluteColumn: {
        paddingBottom: 20,  // Adjusted padding to avoid pushing content off screen
        backgroundColor: "#0D408A",
        borderColor: "#5E27FD",
        borderWidth: 1,
    },
    absoluteImage: {
        position: "absolute",
        top: 18,
        right: -36,
        width: 185,
        height: 41,
    },
    absoluteImage2: {
        position: "absolute",
        bottom: -2,
        left: 13,
        width: 16,
        height: 13,
    },
    button: {
        width: 291,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingVertical: 18,
    },
    button2: {
        width: 291,
        alignItems: "center",
        backgroundColor: "#B8E1EB",
        borderRadius: 30,
        paddingVertical: 18,
    },
    column: {
        marginBottom: 115,
    },
    column2: {
        paddingBottom: 230,
    },
    image: {
        height: 480,
    },
    image2: {
        width: 27,
        height: 27,
        marginRight: 18,
    },
    image3: {
        width: 27,
        height: 27,
    },
    row: {
        flexDirection: "row",
    },
    text: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 36,
    },
    text2: {
        color: "#000000",
        fontSize: 96,
        fontWeight: "bold",
        marginLeft: 82,
    },
    text3: {
        color: "#FFFFFF",
        fontSize: 36,
        marginTop: 7,
        marginBottom: 5,
        marginLeft: 39,
    },
    text4: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 50,
        marginLeft: 34,
    },
    text5: {
        color: "#000000",
        fontSize: 20,
    },
    text6: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    view: {
        paddingVertical: 19,
    },
    view2: {
        paddingVertical: 14,
        marginRight: 246,
    },
    view3: {
        alignItems: "center",
        marginBottom: 14,
    },
    view4: {
        alignItems: "center",
        marginBottom: 25,
    },
    view5: {
        alignItems: "center",
        marginBottom: 22,
    },
    view6: {
        alignItems: "center",
        marginBottom: 106,
    },
});
