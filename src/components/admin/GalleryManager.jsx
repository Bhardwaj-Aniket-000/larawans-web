import { useState, useEffect } from 'react';
import { galleryService } from '../../services/galleryService';
import { cloudinaryClient } from '../../services/cloudinaryClient';
import Button from '../Button';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUpload, FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';

const GalleryManager = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    publicId: '',
    status: true
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = galleryService.subscribeToAllGallery((items) => {
      setGallery(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await galleryService.updateGalleryItem(editingId, formData);
        toast.success('Gallery item updated successfully!');
      } else {
        await galleryService.createGalleryItem(formData);
        toast.success('Gallery item added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast.error('Failed to save gallery item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      imageUrl: item.imageUrl || '',
      publicId: item.publicId || '',
      status: item.status ?? true
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await galleryService.deleteGalleryItem(id);
        toast.success('Gallery item deleted successfully!');
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        toast.error('Failed to delete gallery item');
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadToCloudinary = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setUploading(true);
    try {
      const result = await cloudinaryClient.uploadImage(selectedFile);
      setFormData({
        ...formData,
        imageUrl: result.imageUrl,
        publicId: result.publicId
      });
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      imageUrl: '',
      publicId: '',
      status: true
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-textPrimary">Gallery Management</h2>
        <Button onClick={() => setShowForm(true)} icon={<FaPlus />}>
          Add Image
        </Button>
      </div>

      {showForm && (
        <div className="bg-cardBg rounded-xl p-6 shadow-card-hover mb-6 border border-borderColor">
          <h3 className="text-xl font-semibold text-textPrimary mb-4">
            {editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-textPrimary font-medium mb-2">Upload Image</label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-borderColor rounded-lg hover:border-primary transition-colors cursor-pointer min-h-[48px]">
                      <FaImage className="text-primary" />
                      <span className="text-textSecondary">
                        {selectedFile ? selectedFile.name : 'Select from device'}
                      </span>
                    </div>
                  </label>
                  {selectedFile && !formData.imageUrl && (
                    <Button
                      type="button"
                      onClick={handleUploadToCloudinary}
                      disabled={uploading}
                      icon={<FaUpload />}
                      className="whitespace-nowrap"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  )}
                </div>

                {(previewUrl || formData.imageUrl) && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-borderColor">
                    <img
                      src={formData.imageUrl || previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {formData.imageUrl && (
                      <div className="absolute top-2 right-2 bg-success text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Uploaded ✓
                      </div>
                    )}
                  </div>
                )}

                <div className="text-center">
                  <span className="text-textMuted text-sm">OR</span>
                </div>

                <div>
                  <label className="block text-textPrimary font-medium mb-2">Paste Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Image Title"
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Public ID (Optional)</label>
                <input
                  type="text"
                  value={formData.publicId}
                  onChange={(e) => setFormData({ ...formData, publicId: e.target.value })}
                  placeholder="Cloudinary Public ID"
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="bg-cardBg rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all border border-borderColor group">
            <div className="aspect-square relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-textPrimary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-3 bg-white text-primary rounded-lg hover:bg-primary hover:text-white transition-colors min-w-[48px] min-h-[48px]"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-white text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors min-w-[48px] min-h-[48px]"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {item.title && (
              <div className="p-3">
                <h4 className="font-semibold text-textPrimary text-sm truncate">{item.title}</h4>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
