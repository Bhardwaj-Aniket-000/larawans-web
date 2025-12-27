import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Button from '../Button';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0,
    active: true
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'faqs'));
      const faqsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFaqs(faqsData.sort((a, b) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'faqs', editingId), {
          ...formData,
          order: parseInt(formData.order),
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'faqs'), {
          ...formData,
          order: parseInt(formData.order),
          createdAt: serverTimestamp()
        });
      }
      resetForm();
      fetchFAQs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Failed to save FAQ');
    }
  };

  const handleEdit = (faq) => {
    setFormData({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'General',
      order: faq.order || 0,
      active: faq.active !== false
    });
    setEditingId(faq.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteDoc(doc(db, 'faqs', id));
        fetchFAQs();
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        alert('Failed to delete FAQ');
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'faqs', id), {
        active: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchFAQs();
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
      alert('Failed to update FAQ status');
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      order: 0,
      active: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-textPrimary">FAQ Management</h2>
        <Button onClick={() => setShowForm(true)} icon={<FaPlus />}>
          Add FAQ
        </Button>
      </div>

      {showForm && (
        <div className="bg-cardBg rounded-xl p-6 shadow-card-hover mb-6 border border-borderColor">
          <h3 className="text-xl font-semibold text-textPrimary mb-4">
            {editingId ? 'Edit FAQ' : 'Add New FAQ'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-textPrimary font-medium mb-2">Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Question"
                required
                className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
              />
            </div>

            <div>
              <label className="block text-textPrimary font-medium mb-2">Answer</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Answer"
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="General"
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Status</label>
                <label className="flex items-center h-[48px] px-4 py-3 rounded-lg border border-borderColor cursor-pointer hover:bg-bgSoft">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="ml-2 text-textSecondary">Active</span>
                </label>
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

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className={`bg-cardBg rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all border border-borderColor ${!faq.active && 'opacity-60'}`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                    {faq.category}
                  </span>
                  <span className="text-xs text-textMuted">Order: {faq.order}</span>
                </div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">
                  {faq.question}
                </h3>
                <p className="text-textMuted text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(faq.id, faq.active)}
                  className={`p-2 rounded-lg min-w-[44px] min-h-[44px] ${
                    faq.active 
                      ? 'text-success hover:bg-success/10' 
                      : 'text-textMuted hover:bg-bgSoft'
                  }`}
                  title={faq.active ? 'Active' : 'Inactive'}
                >
                  {faq.active ? <FaToggleOn className="w-6 h-6" /> : <FaToggleOff className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => handleEdit(faq)}
                  className="p-2 text-primary hover:bg-primary/10 rounded-lg min-w-[44px] min-h-[44px]"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg min-w-[44px] min-h-[44px]"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQManager;
