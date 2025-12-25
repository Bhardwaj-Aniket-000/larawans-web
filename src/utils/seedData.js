import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export const seedInitialServices = async () => {
  const servicesRef = collection(db, 'services');
  const snapshot = await getDocs(servicesRef);
  
  if (!snapshot.empty) {
    return;
  }

  const initialServices = [
    {
      title: 'E-commerce/Multi-Vendor E-Com',
      description: 'Build powerful online stores with seamless shopping experiences and multi-vendor capabilities.',
      price: '₹9,999',
      features: ['Custom Design', 'Payment Integration', 'Inventory Management', 'Multi-vendor Support'],
      image: '🛒',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      title: 'Website/Web Design',
      description: 'Stunning, responsive websites that convert visitors into customers.',
      price: '₹14,999',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Custom Development'],
      image: '💻',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      title: 'App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      price: '₹24,999',
      features: ['iOS & Android', 'Cloud Integration', 'Push Notifications', 'Analytics'],
      image: '📱',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      title: 'SEO Service',
      description: 'Comprehensive SEO strategies to rank higher and drive organic traffic.',
      price: '₹14,999',
      features: ['Keyword Research', 'On-page SEO', 'Link Building', 'Monthly Reports'],
      image: '🔍',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      title: 'Digital Marketing',
      description: 'Complete digital marketing solutions to grow your online presence.',
      price: '₹24,999',
      features: ['Social Media Marketing', 'PPC Campaigns', 'Email Marketing', 'Content Strategy'],
      image: '📢',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];

  for (const service of initialServices) {
    await addDoc(servicesRef, service);
  }
};

export const seedInitialPricing = async () => {
  const pricingRef = collection(db, 'pricing');
  const snapshot = await getDocs(pricingRef);
  
  if (!snapshot.empty) {
    return;
  }

  const initialPricing = [
    {
      name: 'Starter',
      price: '9,999',
      period: 'month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Basic Website Design',
        'Mobile Responsive',
        '5 Pages',
        'Basic SEO',
        'Contact Form',
        '1 Month Support',
        'Social Media Setup'
      ],
      highlight: false,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      name: 'Professional',
      price: '19,999',
      period: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Custom Website Design',
        'Mobile Responsive',
        '15 Pages',
        'Advanced SEO',
        'E-commerce Integration',
        '3 Months Support',
        'Social Media Management',
        'Email Marketing',
        'Analytics Dashboard'
      ],
      highlight: true,
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      name: 'Enterprise',
      price: '49,999',
      period: 'month',
      description: 'For large-scale operations',
      features: [
        'Premium Custom Design',
        'Unlimited Pages',
        'Advanced SEO & SEM',
        'Full E-commerce Suite',
        '12 Months Support',
        'Complete Digital Marketing',
        'Dedicated Account Manager',
        'Priority Support 24/7',
        'Custom Integrations',
        'Advanced Analytics'
      ],
      highlight: false,
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];

  for (const plan of initialPricing) {
    await addDoc(pricingRef, plan);
  }
};
