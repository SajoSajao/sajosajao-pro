import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

interface ContactMessage {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  course?: string;
  message: string;
  newsletter: boolean;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const fetchMessages = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('beautyAcademyToken');
      if (!token) {
        setError('Please login first');
        return;
      }

      const params: any = {};
      if (selectedStatus !== 'all') {
        params.status = selectedStatus;
      }

      const response = await apiService.getContactMessages(token, params);

      if (response.success) {
        setMessages(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedStatus]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('beautyAcademyToken');
      if (!token) return;

      await apiService.updateContactMessageStatus(token, id, newStatus);
      fetchMessages();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500 text-white border-blue-500';
      case 'read':
        return 'bg-yellow-500 text-white border-yellow-500';
      case 'replied':
        return 'bg-green-500 text-white border-green-500';
      case 'archived':
        return 'bg-gray-500 text-white border-gray-500';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Filters */}
      <div className="bg-white rounded-lg shadow-md p-3 mb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-0.5">Contact Messages</h2>
            <p className="text-xs text-gray-600">
              <i className="fas fa-envelope mr-1"></i>
              Total: <span className="font-semibold text-rose">{messages.length}</span> messages
              {selectedStatus !== 'all' && (
                <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Filter: {selectedStatus}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs font-medium text-gray-700">Filter:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
          <p className="text-red-700 text-xs">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {error}
          </p>
        </div>
      )}

      {/* Messages Grid */}
      <div className="grid gap-2">
        {messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <i className="fas fa-inbox text-3xl text-gray-300 mb-2"></i>
            <p className="text-gray-500 text-xs">No messages found</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message._id} className="bg-white rounded-lg shadow border-l-4 border-rose p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {message.firstName} {message.lastName}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-sm text-gray-700 space-y-1 sm:space-y-0">
                    <span className="flex items-center">
                      <i className="fas fa-envelope mr-2 text-blue-500"></i>
                      <strong>{message.email}</strong>
                    </span>
                    {message.phone && (
                      <span className="flex items-center">
                        <i className="fas fa-phone mr-2 text-green-500"></i>
                        <strong>{message.phone}</strong>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1 ml-4">
                  <select
                    value={message.status}
                    onChange={(e) => handleStatusChange(message._id, e.target.value)}
                    className={`px-2 py-1 text-sm font-semibold rounded cursor-pointer border ${getStatusBadgeColor(
                      message.status
                    )}`}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <span className="text-sm font-medium text-gray-600">
                    {new Date(message.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {message.course && (
                <div className="mb-2">
                  <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-rose to-pink-500 text-white text-sm font-bold rounded-lg shadow-sm">
                    <i className="fas fa-graduation-cap mr-2"></i>
                    Course Interest: {message.course.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              )}

              <div className="bg-gray-50 border-l-4 border-blue-500 rounded p-3 mb-2">
                <div className="flex items-center mb-2">
                  <i className="fas fa-comment-alt text-blue-500 mr-2"></i>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Message</span>
                </div>
                <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap font-medium">{message.message}</p>
              </div>

              {message.newsletter && (
                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span className="font-medium">Subscribed to newsletter</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
