import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Button from '../Button';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar } from 'react-icons/fa';

const PricingManager = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    period: 'month',
    features: [],
    featured: false,
    buttonText: 'Get Started'
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pricing'));
      const plansData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlans(plansData);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'pricing', editingId), {
          ...formData,
          price: parseFloat(formData.price),
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'pricing'), {
          ...formData,
          price: parseFloat(formData.price),
          createdAt: serverTimestamp()
        });
      }
      resetForm();
      fetchPlans();
    } catch (error) {
      console.error('Error saving pricing plan:', error);
      alert('Failed to save pricing plan');
    }
  };

  const handleEdit = (plan) => {
    setFormData({
      name: plan.name || '',
      description: plan.description || '',
      price: plan.price || '',
      period: plan.period || 'month',
      features: plan.features || [],
      featured: plan.featured || false,
      buttonText: plan.buttonText || 'Get Started'
    });
    setEditingId(plan.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pricing plan?')) {
      try {
        await deleteDoc(doc(db, 'pricing', id));
        fetchPlans();
      } catch (error) {
        console.error('Error deleting pricing plan:', error);
        alert('Failed to delete pricing plan');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      period: 'month',
      features: [],
      featured: false,
      buttonText: 'Get Started'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-textPrimary">Pricing Management</h2>
        <Button onClick={() => setShowForm(true)} icon={<FaPlus />}>
          Add Plan
        </Button>
      </div>

      {showForm && (
        <div className="bg-cardBg rounded-xl p-6 shadow-card-hover mb-6 border border-borderColor">
          <h3 className="text-xl font-semibold text-textPrimary mb-4">
            {editingId ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Plan Name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  placeholder="Get Started"
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-textPrimary font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Plan Description"
                rows="2"
                className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Price"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Period</label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="month"
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Featured</label>
                <label className="flex items-center h-[48px] px-4 py-3 rounded-lg border border-borderColor cursor-pointer hover:bg-bgSoft">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="ml-2 text-textSecondary">Mark as featured</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-textPrimary font-medium mb-2">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Feature"
                    className="flex-1 px-4 py-2 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[44px]"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 min-h-[44px] min-w-[44px]"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="text-primary hover:underline text-sm font-medium"
              >
                + Add Feature
              </button>
            </div>

            <div className="flex gap-3">
              <Button type="submit" icon={<FaSave />}>
                {editingId ? 'Update' : 'Save'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} icon={<FaTimes />}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`bg-cardBg rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all border ${plan.featured ? 'border-primary' : 'border-borderColor'} relative`}>
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                <FaStar className="w-3 h-3 mr-1" />
                Featured
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-textPrimary">{plan.name}</h3>
                <p className="text-textMuted text-sm">{plan.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-lg min-w-[44px] min-h-[44px]"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg min-w-[44px] min-h-[44px]"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mb-4">
              ${plan.price}
              <span className="text-base text-textMuted font-normal"> / {plan.period}</span>
            </div>
            {plan.features && plan.features.length > 0 && (
              <ul className="space-y-2 text-sm text-textSecondary">
                {plan.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
                {plan.features.length > 3 && (
                  <li className="text-textMuted">+{plan.features.length - 3} more</li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingManager;
