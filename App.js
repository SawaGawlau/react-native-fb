// App.js

import React, { useEffect } from "react"
import { SafeAreaView, View, Text } from "react-native"
import messaging from "@react-native-firebase/messaging"
import NotificationHandler from "./NotificationHandler" // Adjust the path
import axios from "axios" // Import Axios for making HTTP requests

const App = () => {
    // Handle background messages
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage)
    })

    useEffect(() => {
        const setupNotifications = async () => {
            try {
                await messaging().requestPermission()
                const token = await messaging().getToken()
                console.log("FCM Token:", token)

                // Send the FCM token to your NestJS backend
                sendTokenToBackend(token)
            } catch (error) {
                console.error("Permission request error:", error)
            }
        }

        const sendTokenToBackend = async (token) => {
            try {
                await axios.post("YOUR_BACKEND_API_ENDPOINT", { token })
                console.log("Token sent to backend successfully")
            } catch (error) {
                console.error("Error sending token to backend:", error)
            }
        }

        setupNotifications()
    }, [])

    return (
        <SafeAreaView>
            <View>
                <Text>Your App Content Goes Here</Text>
            </View>
            {/* Include the NotificationHandler component */}
            <NotificationHandler />
        </SafeAreaView>
    )
}

export default App
