import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'contact_messages';

export const contactService = {
  async createInquiry(data) {
    try {
      const inquiryData = {
        name: data.name?.trim() || '',
        email: data.email?.trim() || '',
        phone: data.phone?.trim() || '',
        message: data.message?.trim() || '',
        read: false,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), inquiryData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating inquiry:', error);
      throw error;
    }
  },

  async getAllInquiries() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      throw error;
    }
  },

  subscribeToInquiries(callback) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const inquiries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(inquiries);
      });
    } catch (error) {
      console.error('Error subscribing to inquiries:', error);
      throw error;
    }
  },

  async markAsRead(id, read = true) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { read });
      return { success: true };
    } catch (error) {
      console.error('Error updating inquiry:', error);
      throw error;
    }
  },

  async deleteInquiry(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      throw error;
    }
  },
};
