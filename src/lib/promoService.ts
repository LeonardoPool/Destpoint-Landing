import { db, storage } from './firebase';
import { 
	collection, 
	addDoc, 
	updateDoc, 
	deleteDoc, 
	doc, 
	getDocs, 
	query, 
	orderBy,
	Timestamp 
} from 'firebase/firestore';
import { 
	ref, 
	uploadBytes, 
	getDownloadURL, 
	deleteObject 
} from 'firebase/storage';

export interface PromoItem {
	id?: string;
	title: string;
	description: string;
	imageUrl: string;
	expirationDate: Date;
	createdAt: Date;
}

export interface SupportImageItem {
	id?: string;
	title: string;
	description: string;
	imageUrl: string;
	expirationDate: Date;
	createdAt: Date;
}

// Convert Firestore Document Data to JS Object
const docToItem = (docData: any) => {
	const data = docData.data();
	return {
		id: docData.id,
		title: data.title || '',
		description: data.description || '',
		imageUrl: data.imageUrl || '',
		expirationDate: data.expirationDate instanceof Timestamp ? data.expirationDate.toDate() : new Date(data.expirationDate),
		createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
	};
};

// --- PROMOTIONS CRUD ---
export const getPromotions = async (): Promise<PromoItem[]> => {
	const q = query(collection(db, 'Promos'), orderBy('createdAt', 'desc'));
	const snap = await getDocs(q);
	return snap.docs.map(docToItem) as PromoItem[];
};

export const addPromotion = async (
	title: string, 
	description: string, 
	imageFile: File | null, 
	imageUrlStr: string,
	expirationDate: Date
): Promise<PromoItem> => {
	let imageUrl = imageUrlStr;
	
	if (imageFile) {
		const storageRef = ref(storage, `promotions/${Date.now()}_${imageFile.name}`);
		const uploadResult = await uploadBytes(storageRef, imageFile);
		imageUrl = await getDownloadURL(uploadResult.ref);
	}

	const newPromo = {
		title,
		description,
		imageUrl,
		expirationDate: Timestamp.fromDate(expirationDate),
		createdAt: Timestamp.now()
	};

	const docRef = await addDoc(collection(db, 'Promos'), newPromo);
	return {
		id: docRef.id,
		...newPromo,
		expirationDate,
		createdAt: new Date()
	} as PromoItem;
};

export const updatePromotion = async (
	id: string,
	title: string,
	description: string,
	imageFile: File | null,
	imageUrlStr: string,
	expirationDate: Date
): Promise<void> => {
	let imageUrl = imageUrlStr;
	
	if (imageFile) {
		const storageRef = ref(storage, `promotions/${Date.now()}_${imageFile.name}`);
		const uploadResult = await uploadBytes(storageRef, imageFile);
		imageUrl = await getDownloadURL(uploadResult.ref);
	}

	const promoRef = doc(db, 'Promos', id);
	await updateDoc(promoRef, {
		title,
		description,
		imageUrl,
		expirationDate: Timestamp.fromDate(expirationDate)
	});
};

export const deletePromotion = async (id: string, imageUrl?: string): Promise<void> => {
	await deleteDoc(doc(db, 'promotions', id));
	
	if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
		try {
			const fileRef = ref(storage, imageUrl);
			await deleteObject(fileRef);
		} catch (e) {
			console.error('Error deleting image from Storage:', e);
		}
	}
};

// --- SUPPORT IMAGES CRUD ---
export const getSupportImages = async (): Promise<SupportImageItem[]> => {
	const q = query(collection(db, 'support_images'), orderBy('createdAt', 'desc'));
	const snap = await getDocs(q);
	return snap.docs.map(docToItem) as SupportImageItem[];
};

export const addSupportImage = async (
	title: string, 
	description: string, 
	imageFile: File | null, 
	imageUrlStr: string,
	expirationDate: Date
): Promise<SupportImageItem> => {
	let imageUrl = imageUrlStr;
	
	if (imageFile) {
		const storageRef = ref(storage, `support_images/${Date.now()}_${imageFile.name}`);
		const uploadResult = await uploadBytes(storageRef, imageFile);
		imageUrl = await getDownloadURL(uploadResult.ref);
	}

	const newSupport = {
		title,
		description,
		imageUrl,
		expirationDate: Timestamp.fromDate(expirationDate),
		createdAt: Timestamp.now()
	};

	const docRef = await addDoc(collection(db, 'support_images'), newSupport);
	return {
		id: docRef.id,
		...newSupport,
		expirationDate,
		createdAt: new Date()
	} as SupportImageItem;
};

export const updateSupportImage = async (
	id: string,
	title: string,
	description: string,
	imageFile: File | null,
	imageUrlStr: string,
	expirationDate: Date
): Promise<void> => {
	let imageUrl = imageUrlStr;
	
	if (imageFile) {
		const storageRef = ref(storage, `support_images/${Date.now()}_${imageFile.name}`);
		const uploadResult = await uploadBytes(storageRef, imageFile);
		imageUrl = await getDownloadURL(uploadResult.ref);
	}

	const supportRef = doc(db, 'support_images', id);
	await updateDoc(supportRef, {
		title,
		description,
		imageUrl,
		expirationDate: Timestamp.fromDate(expirationDate)
	});
};

export const deleteSupportImage = async (id: string, imageUrl?: string): Promise<void> => {
	await deleteDoc(doc(db, 'support_images', id));
	
	if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
		try {
			const fileRef = ref(storage, imageUrl);
			await deleteObject(fileRef);
		} catch (e) {
			console.error('Error deleting support image from Storage:', e);
		}
	}
};
