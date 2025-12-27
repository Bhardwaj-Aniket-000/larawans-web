import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const SERVICES_COLLECTION = 'services';

const servicesCollectionRef = collection(db, SERVICES_COLLECTION);

const sanitizeString = (value, fallback = '') =>
  typeof value === 'string' ? value.trim() : fallback;

const sanitizeFeatures = (features = []) =>
  Array.isArray(features)
    ? features
        .map((feature) => sanitizeString(feature))
        .filter((feature) => feature.length > 0)
    : [];

const sanitizeStartingPrice = (value) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0;
};

const baseServicePayload = (payload) => ({
  title: sanitizeString(payload.title),
  shortDescription: sanitizeString(payload.shortDescription),
  features: sanitizeFeatures(payload.features),
  startingPrice: sanitizeStartingPrice(payload.startingPrice),
  icon: sanitizeString(payload.icon) || '🚀',
  status: typeof payload.status === 'boolean' ? payload.status : true,
});

export const listenToActiveServices = (onNext, onError) => {
  const servicesQuery = query(
    servicesCollectionRef,
    where('status', '==', true)
  );

  return onSnapshot(servicesQuery, onNext, onError);
};

export const listenToAllServices = (onNext, onError) =>
  onSnapshot(servicesCollectionRef, onNext, onError);

export const fetchAllServicesOnce = async () => {
  const snapshot = await getDocs(servicesCollectionRef);

  return snapshot.docs.map((serviceDoc) => ({
    id: serviceDoc.id,
    ...serviceDoc.data(),
  }));
};

export const createService = async (payload) => {
  const cleanedPayload = baseServicePayload(payload);

  if (!cleanedPayload.title || !cleanedPayload.shortDescription) {
    throw new Error('Title and short description are required');
  }

  const document = await addDoc(servicesCollectionRef, {
    ...cleanedPayload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
};

export const updateService = async (serviceId, payload) => {
  const cleanedPayload = baseServicePayload(payload);

  if (!cleanedPayload.title || !cleanedPayload.shortDescription) {
    throw new Error('Title and short description are required');
  }

  await updateDoc(doc(db, SERVICES_COLLECTION, serviceId), {
    ...cleanedPayload,
    updatedAt: serverTimestamp(),
  });
};

export const deleteService = async (serviceId) =>
  deleteDoc(doc(db, SERVICES_COLLECTION, serviceId));

export const toggleServiceStatus = async (serviceId, currentStatus) =>
  updateDoc(doc(db, SERVICES_COLLECTION, serviceId), {
    status: !currentStatus,
    updatedAt: serverTimestamp(),
  });
