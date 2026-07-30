import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

const firebaseConfig = {
	apiKey: env.PUBLIC_FIREBASE_API_KEY,
	authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: env.PUBLIC_FIREBASE_APP_ID,
	measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID
};

export let app: any = null;
export let db: any = null;
export let storage: any = null;
export let auth: any = null;

// Initialize Firebase only on client-side browser if configuration exists
if (browser && env.PUBLIC_FIREBASE_API_KEY) {
	try {
		app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
		db = getFirestore(app, "azuwatravel");
		storage = getStorage(app);
		auth = getAuth(app);
	} catch (error) {
		console.error("Failed to initialize Firebase:", error);
	}
}

// Initialize Analytics helper (client-side only)
export const getAnalyticsInstance = async () => {
	if (browser && app && await isSupported()) {
		try {
			return getAnalytics(app);
		} catch (error) {
			console.error("Failed to initialize Analytics:", error);
		}
	}
	return null;
};
