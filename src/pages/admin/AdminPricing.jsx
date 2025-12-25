import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Plus, Edit2, Trash2, Save, X, Check, Star, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminPricing = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: 'month',
    description: '',
    features: [''],
    highlight: false,
    isActive: true
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const pricingSnapshot = await getDocs(collection(db, 'pricing'));
      const pricingData = pricingSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPricingPlans(pricingData);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch pricing plans');
      setLoading(false);
    }
  };

  const handleAddPlan = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      price: '',
      period: 'month',
      description: '',
      features: [''],
      highlight: false,
      isActive: true
    });
    setShowModal(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name || '',
      price: plan.price || '',
      period: plan.period || 'month',
      description: plan.description || '',
      features: plan.features || [''],
      highlight: plan.highlight || false,
      isActive: plan.isActive !== undefined ? plan.isActive : true
    });
    setShowModal(true);
  };

  const handleDeletePlan = async (planId) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return;

    try {
      await deleteDoc(doc(db, 'pricing', planId));
      setPricingPlans(pricingPlans.filter(p => p.id !== planId));
      toast.success('Pricing plan deleted successfully');
    } catch (error) {
      toast.error('Failed to delete pricing plan');
    }
  };

  const handleToggleActive = async (plan) => {
    try {
      await updateDoc(doc(db, 'pricing', plan.id), {
        isActive: !plan.isActive
      });
      setPricingPlans(pricingPlans.map(p =>
        p.id === plan.id ? { ...p, isActive: !p.isActive } : p
      ));
      toast.success(`Plan ${!plan.isActive ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update plan status');
    }
  };

  const handleToggleHighlight = async (plan) => {
    try {
      const updates = pricingPlans.map(async (p) => {
        if (p.id === plan.id) {
          await updateDoc(doc(db, 'pricing', p.id), { highlight: !plan.highlight });
          return { ...p, highlight: !plan.highlight };
        } else if (p.highlight && !plan.highlight) {
          await updateDoc(doc(db, 'pricing', p.id), { highlight: false });
          return { ...p, highlight: false };
        }
        return p;
      });
      
      const updatedPlans = await Promise.all(updates);
      setPricingPlans(updatedPlans);
      toast.success(`Plan ${!plan.highlight ? 'marked as' : 'removed from'} most popular`);
    } catch (error) {
      toast.error('Failed to update plan highlight');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const planData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      createdAt: editingPlan ? editingPlan.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      if (editingPlan) {
        await updateDoc(doc(db, 'pricing', editingPlan.id), planData);
        setPricingPlans(pricingPlans.map(p =>
          p.id === editingPlan.id ? { ...p, ...planData } : p
        ));
        toast.success('Pricing plan updated successfully');
      } else {
        const docRef = await addDoc(collection(db, 'pricing'), planData);
        setPricingPlans([...pricingPlans, { id: docRef.id, ...planData }]);
        toast.success('Pricing plan added successfully');
      }
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to save pricing plan');
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar />

      <div className="flex-1">
        <div className="border-b border-dark-800 bg-dark-900 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Pricing Management</h1>
              <p className="text-dark-400 mt-1">Manage your pricing plans</p>
            </div>
            <button
              onClick={handleAddPlan}
              className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Pricing Plan</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-primary-600 to-primary-700 shadow-2xl shadow-primary-600/50'
                    : plan.isActive
                    ? 'border border-dark-800 bg-dark-900'
                    : 'border border-dark-800 bg-dark-900/50 opacity-60'
                } p-8`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-yellow-500 px-4 py-1 text-sm font-bold text-dark-950">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className={`text-2xl font-bold ${plan.highlight ? 'text-white' : 'text-white'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-dark-400'}`}>
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-5xl font-bold ${plan.highlight ? 'text-white' : 'text-white'}`}>
                      ₹{plan.price}
                    </span>
                    <span className={`ml-2 ${plan.highlight ? 'text-white/80' : 'text-dark-400'}`}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className={`h-5 w-5 flex-shrink-0 ${plan.highlight ? 'text-white' : 'text-primary-500'}`} />
                      <span className={plan.highlight ? 'text-white/90' : 'text-dark-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 border-t border-dark-700 pt-6">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleActive(plan)}
                      className={`flex-1 rounded-lg p-2 transition-colors ${
                        plan.isActive
                          ? 'bg-green-600/20 text-green-500 hover:bg-green-600/30'
                          : 'bg-red-600/20 text-red-500 hover:bg-red-600/30'
                      }`}
                      title={plan.isActive ? 'Disable' : 'Enable'}
                    >
                      {plan.isActive ? <CheckCircle className="h-5 w-5 mx-auto" /> : <XCircle className="h-5 w-5 mx-auto" />}
                    </button>
                    <button
                      onClick={() => handleToggleHighlight(plan)}
                      className={`flex-1 rounded-lg p-2 transition-colors ${
                        plan.highlight
                          ? 'bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/30'
                          : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
                      }`}
                      title="Mark as Most Popular"
                    >
                      <Star className="h-5 w-5 mx-auto" fill={plan.highlight ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="flex-1 rounded-lg bg-blue-600/20 p-2 text-blue-500 hover:bg-blue-600/30 transition-colors"
                    >
                      <Edit2 className="h-5 w-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="flex-1 rounded-lg bg-red-600/20 p-2 text-red-500 hover:bg-red-600/30 transition-colors"
                    >
                      <Trash2 className="h-5 w-5 mx-auto" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {pricingPlans.length === 0 && (
            <div className="rounded-2xl border border-dark-800 bg-dark-900 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-800 text-3xl">
                💰
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">No pricing plans yet</h3>
              <p className="text-dark-400 mb-6">Get started by adding your first pricing plan</p>
              <button
                onClick={handleAddPlan}
                className="inline-flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Pricing Plan</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-dark-800 bg-dark-900 p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-dark-400 hover:bg-dark-800 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-dark-300">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Plan Name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-dark-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={2}
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Plan Description"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-dark-300">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Price"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-dark-300">Period</label>
                  <select
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                    <option value="one-time">One-time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-dark-300">Features</label>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Feature"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="rounded-lg bg-red-600/20 p-3 text-red-500 hover:bg-red-600/30 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sm text-primary-500 hover:text-primary-400 font-semibold"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-5 w-5 rounded border-dark-700 bg-dark-800 text-primary-600 focus:ring-2 focus:ring-primary-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-dark-300">
                    Plan is active and visible to public
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="highlight"
                    checked={formData.highlight}
                    onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
                    className="h-5 w-5 rounded border-dark-700 bg-dark-800 text-primary-600 focus:ring-2 focus:ring-primary-500"
                  />
                  <label htmlFor="highlight" className="text-sm font-medium text-dark-300">
                    Mark as "Most Popular" plan
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>{editingPlan ? 'Update Plan' : 'Add Plan'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-dark-700 px-6 py-3 font-semibold text-dark-300 hover:bg-dark-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
