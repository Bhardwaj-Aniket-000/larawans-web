import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, Eye, EyeOff, Phone, Calendar, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { contactService } from '../../services/contactService';
import toast from 'react-hot-toast';

export const AdminInquiries = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const unsubscribe = contactService.subscribeToInquiries((data) => {
      setInquiries(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      await contactService.markAsRead(id, !currentStatus);
      toast.success(currentStatus ? 'Marked as unread' : 'Marked as read');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await contactService.deleteInquiry(id);
      toast.success('Inquiry deleted successfully');
    } catch (error) {
      toast.error('Failed to delete inquiry');
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'unread' && !inquiry.read) ||
      (filterStatus === 'read' && inquiry.read);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = inquiries.filter((i) => !i.read).length;

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="mb-4 flex items-center gap-2 rounded-lg bg-dark-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dark-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <h1 className="mb-2 text-3xl font-bold text-white">Contact Inquiries</h1>
          <p className="text-dark-400">
            Manage customer inquiries and messages ({unreadCount} unread)
          </p>
        </motion.div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-500" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-dark-800 py-3 pl-10 pr-4 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
              }`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setFilterStatus('unread')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                filterStatus === 'unread'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilterStatus('read')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                filterStatus === 'read'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
              }`}
            >
              Read ({inquiries.length - unreadCount})
            </button>
          </div>
        </div>

        {filteredInquiries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl bg-dark-800 p-12 text-center"
          >
            <Mail className="mx-auto mb-4 h-16 w-16 text-dark-600" />
            <h3 className="mb-2 text-xl font-semibold text-white">No inquiries found</h3>
            <p className="text-dark-400">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'New inquiries will appear here'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredInquiries.map((inquiry) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`rounded-2xl border p-6 transition-all ${
                    inquiry.read
                      ? 'border-dark-800 bg-dark-900'
                      : 'border-primary-600/30 bg-dark-800'
                  }`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{inquiry.name}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-dark-400">
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {inquiry.email}
                            </span>
                            {inquiry.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {inquiry.phone}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(inquiry.createdAt)}
                            </span>
                          </div>
                        </div>
                        {!inquiry.read && (
                          <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
                            New
                          </span>
                        )}
                      </div>

                      <div className="rounded-lg bg-dark-950/50 p-4">
                        <p className="text-dark-300">{inquiry.message}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 lg:flex-col">
                      <button
                        onClick={() => handleToggleRead(inquiry.id, inquiry.read)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-dark-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-dark-600"
                        title={inquiry.read ? 'Mark as unread' : 'Mark as read'}
                      >
                        {inquiry.read ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            <span className="hidden sm:inline">Unread</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">Read</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(inquiry.id)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-red-600/20 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-600/30"
                        title="Delete inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Delete</span>
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
  );
};
