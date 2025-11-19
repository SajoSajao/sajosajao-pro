import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { STORAGE_KEYS, MESSAGES, DATE_FORMATS } from '../constants/config';

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  course: string;
  courseFee: string;
  message?: string;
  status: 'new' | 'contacted' | 'enrolled' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export const CustomerEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        setError(MESSAGES.INFO.PLEASE_LOGIN);
        return;
      }

      const params: any = { page: currentPage, limit: 20 };
      if (selectedStatus !== 'all') {
        params.status = selectedStatus;
      }

      const response = await apiService.getEnquiries(token, params);

      if (response.success) {
        setEnquiries(response.data);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : MESSAGES.ERROR.FETCH_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus, currentPage]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('beautyAcademyToken');
      if (!token) return;

      await apiService.updateEnquiryStatus(token, id, newStatus);
      fetchEnquiries(); // Refresh the list
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'enrolled':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Filters */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Customer Enquiries</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Total: {total} enquiries
            </p>
          </div>

          {/* Filter by Status */}
          <div className="flex items-center space-x-3">
            <label className="text-xs font-medium text-gray-700">Filter:</label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5">
          <p className="text-red-700 text-sm">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </p>
        </div>
      )}

      {/* Enquiries Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-700 to-gray-800">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Course
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-500">
                    <i className="fas fa-inbox text-4xl mb-3 block text-gray-300"></i>
                    <p className="text-sm font-medium">No enquiries found</p>
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {new Date(enquiry.createdAt).toLocaleDateString(DATE_FORMATS.DISPLAY, DATE_FORMATS.SHORT)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{enquiry.name}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <a href={`tel:${enquiry.phone}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                        {enquiry.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-800 font-medium">{enquiry.course}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">₹{enquiry.courseFee}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-full cursor-pointer border-2 ${getStatusBadgeColor(
                          enquiry.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <span className="text-sm text-gray-700 line-clamp-2">{enquiry.message || '-'}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
            <div className="text-xs text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
