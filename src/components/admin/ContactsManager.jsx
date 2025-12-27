import { useState, useEffect } from 'react';
import { contactService } from '../../services/contactService';
import { FaTrash, FaEnvelope, FaPhone, FaUser, FaCalendar, FaCheckCircle, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = contactService.subscribeToInquiries((inquiries) => {
      setContacts(inquiries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteInquiry(id);
        toast.success('Contact deleted successfully!');
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete contact');
      }
    }
  };

  const updateStatus = async (id, isRead) => {
    try {
      await contactService.markAsRead(id, isRead);
      toast.success('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredContacts = filter === 'all' 
    ? contacts 
    : filter === 'read'
    ? contacts.filter(contact => contact.read === true)
    : contacts.filter(contact => contact.read === false);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-textPrimary">Contact Messages</h2>
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'read'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all min-h-[44px] ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-white text-textSecondary hover:bg-bgSoft border border-borderColor'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredContacts.length > 0 ? (
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="bg-cardBg rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all border border-borderColor">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      contact.read ? 'bg-yellow-100 text-yellow-700' : 'bg-primary/10 text-primary'
                    }`}>
                      {contact.read ? 'Read' : 'New'}
                    </span>
                    <span className="flex items-center text-xs text-textMuted">
                      <FaCalendar className="w-3 h-3 mr-1" />
                      {formatDate(contact.createdAt)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-textSecondary">
                      <FaUser className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-medium">{contact.name}</span>
                    </div>
                    <div className="flex items-center text-textSecondary">
                      <FaEnvelope className="w-4 h-4 mr-2 text-primary" />
                      <a href={`mailto:${contact.email}`} className="hover:text-primary">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center text-textSecondary">
                        <FaPhone className="w-4 h-4 mr-2 text-primary" />
                        <a href={`tel:${contact.phone}`} className="hover:text-primary">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {contact.subject && (
                    <h3 className="text-lg font-semibold text-textPrimary mb-2">
                      {contact.subject}
                    </h3>
                  )}
                  
                  <p className="text-textMuted leading-relaxed">
                    {contact.message}
                  </p>
                </div>

                <div className="flex lg:flex-col gap-2">
                  {!contact.read && (
                    <button
                      onClick={() => updateStatus(contact.id, true)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap"
                      title="Mark as Read"
                    >
                      <FaCheckCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Mark Read</span>
                    </button>
                  )}
                  {contact.read && (
                    <button
                      onClick={() => updateStatus(contact.id, false)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap"
                      title="Mark as Unread"
                    >
                      <FaClock className="w-4 h-4" />
                      <span className="hidden sm:inline">Mark Unread</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap"
                    title="Delete"
                  >
                    <FaTrash className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-cardBg rounded-xl border border-borderColor shadow-card">
          <div className="w-24 h-24 bg-bgSoft rounded-full flex items-center justify-center mx-auto mb-6">
            <FaEnvelope className="w-10 h-10 text-textMuted" />
          </div>
          <h3 className="text-2xl font-bold text-textPrimary mb-4">
            No Messages Found
          </h3>
          <p className="text-textMuted">
            {filter === 'all' 
              ? 'Contact messages will appear here once submitted.'
              : `No ${filter} messages found.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactsManager;
