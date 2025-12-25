import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, Eye, EyeOff, Image as ImageIcon, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryService } from '../../services/galleryService';
import { cloudinaryClient } from '../../services/cloudinaryClient';
import { AdminSidebar } from '../../components/AdminSidebar';
import toast from 'react-hot-toast';

export const AdminGallery = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    imageFile: null,
    imagePreview: null,
  });

  useEffect(() => {
    const unsubscribe = galleryService.subscribeToAllGallery((data) => {
      setItems(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageFile: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.imageFile) {
      toast.error('Please select an image');
      return;
    }

    setUploading(true);

    try {
      const uploadResult = await cloudinaryClient.uploadImage(formData.imageFile);

      await galleryService.createGalleryItem({
        title: formData.title,
        imageUrl: uploadResult.imageUrl,
        publicId: uploadResult.publicId,
        status: true,
      });

      toast.success('Image uploaded successfully');
      setShowModal(false);
      setFormData({ title: '', imageFile: null, imagePreview: null });
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await galleryService.toggleStatus(id, currentStatus);
      toast.success(currentStatus ? 'Image hidden' : 'Image published');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await galleryService.deleteGalleryItem(id);
      toast.success('Image deleted successfully');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
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
              <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
              <p className="text-dark-400 mt-1">Manage your gallery images</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Image</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="mb-6 flex items-center gap-2 rounded-lg bg-dark-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dark-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl bg-dark-800 p-12 text-center"
            >
              <ImageIcon className="mx-auto mb-4 h-16 w-16 text-dark-600" />
              <h3 className="mb-2 text-xl font-semibold text-white">No images yet</h3>
              <p className="text-dark-400 mb-6">Upload your first image to get started</p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                <Upload className="h-5 w-5" />
                <span>Upload Image</span>
              </button>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group relative overflow-hidden rounded-2xl border ${
                      item.status
                        ? 'border-dark-800 bg-dark-900'
                        : 'border-dark-800 bg-dark-900/50 opacity-60'
                    }`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-3 text-lg font-semibold text-white truncate">{item.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleStatus(item.id, item.status)}
                          className={`flex-1 rounded-lg p-2 transition-colors ${
                            item.status
                              ? 'bg-green-600/20 text-green-500 hover:bg-green-600/30'
                              : 'bg-red-600/20 text-red-500 hover:bg-red-600/30'
                          }`}
                          title={item.status ? 'Hide' : 'Publish'}
                        >
                          {item.status ? (
                            <Eye className="h-5 w-5 mx-auto" />
                          ) : (
                            <EyeOff className="h-5 w-5 mx-auto" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 rounded-lg bg-red-600/20 p-2 text-red-500 hover:bg-red-600/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-2xl border border-dark-800 bg-dark-900 p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Upload Image</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setFormData({ title: '', imageFile: null, imagePreview: null });
                }}
                className="rounded-lg p-2 text-dark-400 hover:bg-dark-800 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-dark-300">Image Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Image Title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-dark-300">Select Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-dark-700 bg-dark-800 p-8 transition-colors hover:border-primary-600 hover:bg-dark-700"
                  >
                    {formData.imagePreview ? (
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="max-h-64 rounded-lg object-contain"
                      />
                    ) : (
                      <>
                        <Upload className="mb-2 h-12 w-12 text-dark-500" />
                        <p className="text-sm text-dark-400">Click to upload image</p>
                        <p className="mt-1 text-xs text-dark-500">PNG, JPG, WebP (max 10MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Upload</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ title: '', imageFile: null, imagePreview: null });
                  }}
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
