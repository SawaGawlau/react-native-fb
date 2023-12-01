// NotificationHandler.js

import React, { useEffect } from "react"
import messaging from "@react-native-firebase/messaging"

const NotificationHandler = () => {
    useEffect(() => {
        const getToken = async () => {
            try {
                await messaging().requestPermission()
                const token = await messaging().getToken()
                console.log("FCM Token:", token)
                // Send this token to your NestJS backend
            } catch (error) {
                console.error("Permission request error:", error)
            }
        }

        getToken()

        const unsubscribeForeground = messaging().onMessage(
            async (remoteMessage) => {
                console.log("Foreground Notification:", remoteMessage)
                // Handle foreground notifications
            }
        )

        return () => {
            unsubscribeForeground()
        }
    }, [])

    return null // or render other UI components if needed
}

export default NotificationHandler
