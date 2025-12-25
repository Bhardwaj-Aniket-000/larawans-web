import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, CheckCircle, Users, MessageSquare } from 'lucide-react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import { SEO } from '../components/SEO';

export const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('messages');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const messagesQuery = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
      const messagesSnapshot = await getDocs(messagesQuery);
      const messagesData = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);

      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await updateDoc(doc(db, 'contact_messages', messageId), {
        read: true
      });
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
      toast.success('Message marked as read');
    } catch (error) {
      toast.error('Failed to update message');
      console.error('Error:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await deleteDoc(doc(db, 'contact_messages', messageId));
      setMessages(messages.filter(msg => msg.id !== messageId));
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
      console.error('Error:', error);
    }
  };

  const stats = [
    { label: 'Total Messages', value: messages.length, icon: MessageSquare, color: 'blue' },
    { label: 'Unread Messages', value: messages.filter(m => !m.read).length, icon: Mail, color: 'red' },
    { label: 'Total Users', value: users.length, icon: Users, color: 'green' },
    { label: 'Admin Users', value: users.filter(u => u.role === 'admin').length, icon: CheckCircle, color: 'purple' },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Admin Dashboard" description="Admin dashboard for Larawans Digital" />

      <section className="min-h-screen bg-dark-950 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="mb-2 text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-dark-400">Manage messages and users</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-dark-800 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
                  <div className={`text-3xl font-bold text-${stat.color}-500`}>{stat.value}</div>
                </div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mb-6 flex space-x-4 border-b border-dark-800">
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === 'messages'
                  ? 'border-b-2 border-primary-500 text-primary-500'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              Messages ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === 'users'
                  ? 'border-b-2 border-primary-500 text-primary-500'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              Users ({users.length})
            </button>
          </div>

          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="rounded-2xl bg-dark-800 p-12 text-center">
                  <MessageSquare className="mx-auto mb-4 h-12 w-12 text-dark-600" />
                  <p className="text-dark-400">No messages yet</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-2xl bg-dark-800 p-6 ${
                      !message.read ? 'border-l-4 border-primary-500' : ''
                    }`}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-white">{message.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-dark-400">
                          <span>{message.email}</span>
                          {message.phone && <span>{message.phone}</span>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!message.read && (
                          <button
                            onClick={() => markAsRead(message.id)}
                            className="rounded-lg bg-green-600 p-2 text-white transition-colors hover:bg-green-700"
                            title="Mark as read"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="rounded-lg bg-red-600 p-2 text-white transition-colors hover:bg-red-700"
                          title="Delete message"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="mb-4 text-dark-300">{message.message}</p>
                    <div className="text-xs text-dark-500">
                      {new Date(message.createdAt).toLocaleString()}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-800">
                    <th className="pb-4 text-left text-sm font-semibold text-dark-400">Name</th>
                    <th className="pb-4 text-left text-sm font-semibold text-dark-400">Email</th>
                    <th className="pb-4 text-left text-sm font-semibold text-dark-400">Role</th>
                    <th className="pb-4 text-left text-sm font-semibold text-dark-400">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-dark-800"
                    >
                      <td className="py-4 text-white">{user.name}</td>
                      <td className="py-4 text-dark-300">{user.email}</td>
                      <td className="py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-red-600/20 text-red-500'
                              : 'bg-blue-600/20 text-blue-500'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 text-dark-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
