import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Plus, Edit2, Trash2, Save, X, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useServices } from '../../hooks/useServices';
import { 
  createService, 
  updateService, 
  deleteService as removeService, 
  toggleServiceStatus 
} from '../../services/servicesService';

const emptyForm = {
  title: '',
  shortDescription: '',
  startingPrice: '',
  icon: '',
  iconType: 'emoji',
  features: [''],
  status: true,
};

const formatCurrency = (amount) =>
  typeof amount === 'number'
    ? `₹${amount.toLocaleString('en-IN')}`
    : `₹${Number(amount || 0).toLocaleString('en-IN')}`;

const parsePriceToNumber = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const numeric = Number(String(value ?? '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
};

const getServiceStatus = (service) => service.status ?? service.isActive ?? true;
const getServiceIcon = (service) => service.icon || service.image || '🚀';
const isImageIcon = (icon) =>
  typeof icon === 'string' && (icon.startsWith('http://') || icon.startsWith('https://'));
const getServiceDescription = (service) => service.shortDescription || service.description || '';

export const AdminServices = () => {
  const { services, loading } = useServices({ activeOnly: false });
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleAddService = () => {
    setEditingService(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      shortDescription: getServiceDescription(service),
      startingPrice: parsePriceToNumber(service.startingPrice ?? service.price),
      icon: service.icon || service.image || '',
      iconType: isImageIcon(service.icon || service.image) ? 'image' : 'emoji',
      features: service.features?.length ? service.features : [''],
      status: getServiceStatus(service),
    });
    setShowModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await removeService(serviceId);
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const handleToggleActive = async (service) => {
    try {
      const currentStatus = getServiceStatus(service);
      await toggleServiceStatus(service.id, currentStatus);
      toast.success(`Service ${currentStatus ? 'disabled' : 'enabled'}`);
    } catch (error) {
      toast.error('Failed to update service status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      startingPrice: Number(formData.startingPrice) || 0,
      features: formData.features.filter((feature) => feature.trim() !== ''),
      icon:
        formData.iconType === 'image'
          ? formData.icon?.trim()
          : formData.icon || '🚀',
    };

    try {
      if (editingService) {
        await updateService(editingService.id, payload);
        toast.success('Service updated successfully');
      } else {
        await createService(payload);
        toast.success('Service added successfully');
      }

      setFormData(emptyForm);
      setEditingService(null);
      setShowModal(false);
    } catch (error) {
      toast.error(error.message || 'Failed to save service');
    } finally {
      setSubmitting(false);
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
    setFormData({ ...formData, features: newFeatures.length ? newFeatures : [''] });
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
              <h1 className="text-3xl font-bold text-white">Services Management</h1>
              <p className="text-dark-400 mt-1">Manage your service offerings</p>
            </div>
            <button
              onClick={handleAddService}
              className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Service</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-2xl border ${
                  getServiceStatus(service) ? 'border-dark-800 bg-dark-900' : 'border-dark-800 bg-dark-900/50 opacity-60'
                } p-6`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="text-4xl">
                    {isImageIcon(getServiceIcon(service)) ? (
                      <img
                        src={getServiceIcon(service)}
                        alt={service.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      getServiceIcon(service)
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleActive(service)}
                      className={`rounded-lg p-2 transition-colors ${
                        getServiceStatus(service)
                          ? 'bg-green-600/20 text-green-500 hover:bg-green-600/30'
                          : 'bg-red-600/20 text-red-500 hover:bg-red-600/30'
                      }`}
                      title={getServiceStatus(service) ? 'Disable' : 'Enable'}
                    >
                      {getServiceStatus(service) ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => handleEditService(service)}
                      className="rounded-lg bg-blue-600/20 p-2 text-blue-500 hover:bg-blue-600/30 transition-colors"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="rounded-lg bg-red-600/20 p-2 text-red-500 hover:bg-red-600/30 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="mb-4 text-sm text-dark-400 line-clamp-2">{getServiceDescription(service)}</p>

                <div className="mb-4 space-y-1">
                  {service.features?.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-dark-300">
                      <CheckCircle className="h-3 w-3 text-primary-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {service.features?.length > 3 && (
                    <p className="text-xs text-dark-500">+{service.features.length - 3} more</p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-dark-800 pt-4">
                  <div className="text-2xl font-bold text-primary-500">
                    {formatCurrency(parsePriceToNumber(service.startingPrice ?? service.price))}
                  </div>
                  <div className={`text-xs font-semibold ${getServiceStatus(service) ? 'text-green-500' : 'text-red-500'}`}>
                    {getServiceStatus(service) ? 'ACTIVE' : 'DISABLED'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {services.length === 0 && (
            <div className="rounded-2xl border border-dark-800 bg-dark-900 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-800 text-3xl">
                📦
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">No services yet</h3>
              <p className="text-dark-400 mb-6">Get started by adding your first service</p>
              <button
                onClick={handleAddService}
                className="inline-flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Service</span>
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
                {editingService ? 'Edit Service' : 'Add New Service'}
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
                <label className="mb-2 block text-sm font-medium text-dark-300">Service Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Service Title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-dark-300">Short Description</label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  required
                  rows={3}
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Short Description"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-dark-300">Starting Price (INR)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    required
                    className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Starting Price"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-dark-300">Icon Type</label>
                  <div className="flex space-x-2">
                    {['emoji', 'image'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, iconType: type, icon: '' })}
                        className={`flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                          formData.iconType === type
                            ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                            : 'border-dark-700 text-dark-300 hover:border-primary-500/40'
                        }`}
                      >
                        {type === 'emoji' ? 'Emoji Icon' : 'Image URL'}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="mt-3 w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={formData.iconType === 'emoji' ? '🚀' : 'https://example.com/icon.png'}
                    required={formData.iconType === 'image'}
                  />
                  {formData.iconType === 'image' && formData.icon && (
                    <div className="mt-3 rounded-xl border border-dark-800 bg-dark-800/60 p-3">
                      <p className="mb-2 text-xs text-dark-400">Preview:</p>
                      <img
                        src={formData.icon}
                        alt="Service icon preview"
                        className="h-16 w-16 rounded-lg object-cover"
                        onError={() => setFormData({ ...formData, icon: '' })}
                      />
                    </div>
                  )}
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

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="status"
                  checked={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  className="h-5 w-5 rounded border-dark-700 bg-dark-800 text-primary-600 focus:ring-2 focus:ring-primary-500"
                />
                <label htmlFor="status" className="text-sm font-medium text-dark-300">
                  Service is active and visible to public
                </label>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors disabled:opacity-60"
                >
                  <Save className="h-5 w-5" />
                  <span>
                    {submitting
                      ? 'Saving...'
                      : editingService
                      ? 'Update Service'
                      : 'Add Service'}
                  </span>
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
