import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

const firebaseConfig = {
	apiKey: env.PUBLIC_FIREBASE_API_KEY || "AIzaSyB7IpuZmc9G_xtYeRX_FerySy0GAZcfYbc",
	authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN || "azuwatravel-49545.firebaseapp.com",
	projectId: env.PUBLIC_FIREBASE_PROJECT_ID || "azuwatravel-49545",
	storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET || "azuwatravel-49545.firebasestorage.app",
	messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "197254677488",
	appId: env.PUBLIC_FIREBASE_APP_ID || "1:197254677488:web:0e7cb1664aa8ea03ebd335",
	measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID || "G-LR4FYD4CMC"
};

export let app: any = null;
export let db: any = null;
export let storage: any = null;
export let auth: any = null;

// Initialize Firebase only on client-side browser
if (browser) {
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
