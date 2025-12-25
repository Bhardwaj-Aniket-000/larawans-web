import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Plus, Edit2, Trash2, Save, X, CheckCircle, XCircle, MoveUp, MoveDown } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    isActive: true,
    order: 0
  });

  const categories = ['General', 'Pricing', 'Services', 'Support', 'Technical'];

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const faqsQuery = query(collection(db, 'faqs'), orderBy('order', 'asc'));
      const faqsSnapshot = await getDocs(faqsQuery);
      const faqsData = faqsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFaqs(faqsData);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch FAQs');
      setLoading(false);
    }
  };

  const handleAddFAQ = () => {
    setEditingFAQ(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      isActive: true,
      order: faqs.length
    });
    setShowModal(true);
  };

  const handleEditFAQ = (faq) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'General',
      isActive: faq.isActive !== undefined ? faq.isActive : true,
      order: faq.order || 0
    });
    setShowModal(true);
  };

  const handleDeleteFAQ = async (faqId) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await deleteDoc(doc(db, 'faqs', faqId));
      setFaqs(faqs.filter(f => f.id !== faqId));
      toast.success('FAQ deleted successfully');
    } catch (error) {
      toast.error('Failed to delete FAQ');
    }
  };

  const handleToggleActive = async (faq) => {
    try {
      await updateDoc(doc(db, 'faqs', faq.id), {
        isActive: !faq.isActive
      });
      setFaqs(faqs.map(f =>
        f.id === faq.id ? { ...f, isActive: !f.isActive } : f
      ));
      toast.success(`FAQ ${!faq.isActive ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update FAQ status');
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    
    const newFaqs = [...faqs];
    [newFaqs[index], newFaqs[index - 1]] = [newFaqs[index - 1], newFaqs[index]];
    
    try {
      await updateDoc(doc(db, 'faqs', newFaqs[index].id), { order: index });
      await updateDoc(doc(db, 'faqs', newFaqs[index - 1].id), { order: index - 1 });
      
      setFaqs(newFaqs.map((faq, idx) => ({ ...faq, order: idx })));
      toast.success('FAQ order updated');
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const handleMoveDown = async (index) => {
    if (index === faqs.length - 1) return;
    
    const newFaqs = [...faqs];
    [newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]];
    
    try {
      await updateDoc(doc(db, 'faqs', newFaqs[index].id), { order: index });
      await updateDoc(doc(db, 'faqs', newFaqs[index + 1].id), { order: index + 1 });
      
      setFaqs(newFaqs.map((faq, idx) => ({ ...faq, order: idx })));
      toast.success('FAQ order updated');
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const faqData = {
      ...formData,
      createdAt: editingFAQ ? editingFAQ.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      if (editingFAQ) {
        await updateDoc(doc(db, 'faqs', editingFAQ.id), faqData);
        setFaqs(faqs.map(f =>
          f.id === editingFAQ.id ? { ...f, ...faqData } : f
        ));
        toast.success('FAQ updated successfully');
      } else {
        const docRef = await addDoc(collection(db, 'faqs'), faqData);
        setFaqs([...faqs, { id: docRef.id, ...faqData }]);
        toast.success('FAQ added successfully');
      }
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to save FAQ');
    }
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
              <h1 className="text-3xl font-bold text-white">FAQ Management</h1>
              <p className="text-dark-400 mt-1">Manage frequently asked questions</p>
            </div>
            <button
              onClick={handleAddFAQ}
              className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add FAQ</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="rounded-2xl border border-dark-800 bg-dark-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">Order</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">Question</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-dark-300">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-dark-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-800 text-3xl">
                          ❓
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">No FAQs yet</h3>
                        <p className="text-dark-400 mb-6">Get started by adding your first FAQ</p>
                        <button
                          onClick={handleAddFAQ}
                          className="inline-flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
                        >
                          <Plus className="h-5 w-5" />
                          <span>Add FAQ</span>
                        </button>
                      </td>
                    </tr>
                  ) : (
                    faqs.map((faq, index) => (
                      <motion.tr
                        key={faq.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-dark-800 hover:bg-dark-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{index + 1}</span>
                            <div className="flex flex-col space-y-1">
                              <button
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                                className="rounded p-1 text-dark-400 hover:text-white hover:bg-dark-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <MoveUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleMoveDown(index)}
                                disabled={index === faqs.length - 1}
                                className="rounded p-1 text-dark-400 hover:text-white hover:bg-dark-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <MoveDown className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-md">
                            <p className="text-white font-medium line-clamp-2">{faq.question}</p>
                            <p className="text-dark-400 text-sm line-clamp-1 mt-1">{faq.answer}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block rounded-full bg-primary-600/20 px-3 py-1 text-xs font-semibold text-primary-500">
                            {faq.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleActive(faq)}
                            className={`inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-semibold ${
                              faq.isActive
                                ? 'bg-green-600/20 text-green-500'
                                : 'bg-red-600/20 text-red-500'
                            }`}
                          >
                            {faq.isActive ? (
                              <>
                                <CheckCircle className="h-3 w-3" />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3" />
                                <span>Disabled</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEditFAQ(faq)}
                              className="rounded-lg bg-blue-600/20 p-2 text-blue-500 hover:bg-blue-600/30 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFAQ(faq.id)}
                              className="rounded-lg bg-red-600/20 p-2 text-red-500 hover:bg-red-600/30 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
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
                {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
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
                <label className="mb-2 block text-sm font-medium text-dark-300">Question</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Question"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-dark-300">Answer</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  required
                  rows={5}
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Answer"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-dark-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-dark-300">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    min="0"
                    className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Order"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-5 w-5 rounded border-dark-700 bg-dark-800 text-primary-600 focus:ring-2 focus:ring-primary-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-dark-300">
                  FAQ is active and visible to public
                </label>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>{editingFAQ ? 'Update FAQ' : 'Add FAQ'}</span>
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
