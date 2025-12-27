import { useState, useEffect } from 'react';
import { createService, updateService, deleteService, listenToAllServices } from '../../services/servicesService';
import Button from '../Button';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    icon: '🚀',
    startingPrice: '',
    features: [],
    status: true
  });

  useEffect(() => {
    const unsubscribe = listenToAllServices(
      (snapshot) => {
        const servicesData = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setServices(servicesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateService(editingId, formData);
        toast.success('Service updated successfully!');
      } else {
        await createService(formData);
        toast.success('Service added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      if (error.code === 'permission-denied') {
        toast.error('Permission denied. Please check your Firebase security rules.');
      } else if (error.code === 'unauthenticated') {
        toast.error('You must be logged in to add services.');
      } else {
        toast.error('Failed to save service: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title || '',
      shortDescription: service.shortDescription || '',
      icon: service.icon || '🚀',
      startingPrice: service.startingPrice || '',
      features: service.features || [],
      status: service.status ?? true
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        toast.success('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Failed to delete service');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      shortDescription: '',
      icon: '🚀',
      startingPrice: '',
      features: [],
      status: true
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
        <h2 className="text-2xl font-bold text-textPrimary">Services Management</h2>
        <Button onClick={() => setShowForm(true)} icon={<FaPlus />}>
          Add Service
        </Button>
      </div>

      {showForm && (
        <div className="bg-cardBg rounded-xl p-6 shadow-card-hover mb-6 border border-borderColor">
          <h3 className="text-xl font-semibold text-textPrimary mb-4">
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Service Title"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🚀"
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-textPrimary font-medium mb-2">Short Description</label>
              <textarea
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Short Description"
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-textPrimary font-medium mb-2">Starting Price</label>
              <input
                type="number"
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                placeholder="Starting Price"
                className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
              />
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
        {services.map((service) => (
          <div key={service.id} className="bg-cardBg rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all border border-borderColor hover:border-secondary">
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{service.icon}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-lg min-w-[44px] min-h-[44px]"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg min-w-[44px] min-h-[44px]"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-textPrimary mb-2">{service.title}</h3>
            <p className="text-textMuted text-sm mb-3">{service.shortDescription}</p>
            {service.startingPrice && (
              <p className="text-primary font-bold text-lg">
                Starting from ₹{service.startingPrice}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
