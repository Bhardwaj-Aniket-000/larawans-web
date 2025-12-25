import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'gallery';

export const galleryService = {
  async createGalleryItem(data) {
    try {
      const itemData = {
        title: data.title?.trim() || '',
        imageUrl: data.imageUrl || '',
        publicId: data.publicId || '',
        status: data.status !== undefined ? data.status : true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), itemData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating gallery item:', error);
      throw error;
    }
  },

  async getAllGalleryItems() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  },

  async getActiveGalleryItems() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', true),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching active gallery items:', error);
      throw error;
    }
  },

  subscribeToActiveGallery(callback) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', true),
        orderBy('createdAt', 'desc')
      );
      return onSnapshot(q, 
        (snapshot) => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(items);
        },
        (error) => {
          console.error('Error in gallery subscription:', error);
          callback([]);
        }
      );
    } catch (error) {
      console.error('Error subscribing to gallery:', error);
      callback([]);
      return () => {};
    }
  },

  subscribeToAllGallery(callback) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      return onSnapshot(q, 
        (snapshot) => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(items);
        },
        (error) => {
          console.error('Error in all gallery subscription:', error);
          callback([]);
        }
      );
    } catch (error) {
      console.error('Error subscribing to all gallery:', error);
      callback([]);
      return () => {};
    }
  },

  async updateGalleryItem(id, data) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(docRef, updateData);
      return { success: true };
    } catch (error) {
      console.error('Error updating gallery item:', error);
      throw error;
    }
  },

  async deleteGalleryItem(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      throw error;
    }
  },

  async toggleStatus(id, currentStatus) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { 
        status: !currentStatus,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error toggling status:', error);
      throw error;
    }
  },
};
