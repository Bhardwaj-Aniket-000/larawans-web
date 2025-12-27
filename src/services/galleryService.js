import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'gallery';

export const galleryService = {
  // CREATE
  async createGalleryItem(data) {
    try {
      const itemData = {
        title: data.title?.trim() || '',
        imageUrl: data.imageUrl || '',
        publicId: data.publicId || '',
        status: data.status ?? true,
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

  // GET ALL (NO INDEX)
  async getAllGalleryItems() {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));

      return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        );
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  },

  // GET ACTIVE (NO INDEX)
  async getActiveGalleryItems() {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));

      return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.status === true)
        .sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        );
    } catch (error) {
      console.error('Error fetching active gallery items:', error);
      throw error;
    }
  },

  // REALTIME ACTIVE (NO INDEX)
  subscribeToActiveGallery(callback) {
    try {
      return onSnapshot(
        collection(db, COLLECTION_NAME),
        (snapshot) => {
          const items = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(item => item.status === true)
            .sort(
              (a, b) =>
                (b.createdAt?.seconds || 0) -
                (a.createdAt?.seconds || 0)
            );

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

  // REALTIME ALL (NO INDEX)
  subscribeToAllGallery(callback) {
    try {
      return onSnapshot(
        collection(db, COLLECTION_NAME),
        (snapshot) => {
          const items = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort(
              (a, b) =>
                (b.createdAt?.seconds || 0) -
                (a.createdAt?.seconds || 0)
            );

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

  // UPDATE
  async updateGalleryItem(id, data) {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating gallery item:', error);
      throw error;
    }
  },

  // DELETE
  async deleteGalleryItem(id) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      throw error;
    }
  },

  // TOGGLE STATUS
  async toggleStatus(id, currentStatus) {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id), {
        status: !currentStatus,
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error('Error toggling status:', error);
      throw error;
    }
  },
};
