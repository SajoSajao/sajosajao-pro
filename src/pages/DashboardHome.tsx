import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { STORAGE_KEYS } from '../constants/config';
import { ROUTES } from '../constants/routes';

interface Stats {
  totalEnquiries: number;
  totalMessages: number;
  newThisWeek: number;
  enrolledStudents: number;
}

export const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalEnquiries: 0,
    totalMessages: 0,
    newThisWeek: 0,
    enrolledStudents: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) return;

      // Fetch all enquiries and messages
      const [enquiriesRes, messagesRes] = await Promise.all([
        apiService.getEnquiries(token, {}),
        apiService.getContactMessages(token, {}),
      ]);

      if (enquiriesRes.success && messagesRes.success) {
        const enquiries = enquiriesRes.data || [];
        const messages = messagesRes.data || [];

        // Calculate new this week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const newThisWeek = enquiries.filter((e: any) => 
          new Date(e.createdAt) > oneWeekAgo
        ).length;

        const enrolledStudents = enquiries.filter((e: any) => 
          e.status === 'enrolled'
        ).length;

        setStats({
          totalEnquiries: enquiries.length,
          totalMessages: messages.length,
          newThisWeek,
          enrolledStudents,
        });
      }
    } catch (error) {
      // Error fetching stats - handle gracefully
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries.toString(),
      icon: 'fas fa-users',
      color: 'blue',
      link: ROUTES.ADMIN.ENQUIRIES,
    },
    {
      title: 'Contact Messages',
      value: stats.totalMessages.toString(),
      icon: 'fas fa-envelope',
      color: 'green',
      link: ROUTES.ADMIN.MESSAGES,
    },
    {
      title: 'New This Week',
      value: stats.newThisWeek.toString(),
      icon: 'fas fa-chart-line',
      color: 'purple',
    },
    {
      title: 'Enrolled Students',
      value: stats.enrolledStudents.toString(),
      icon: 'fas fa-graduation-cap',
      color: 'orange',
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Welcome to Admin Dashboard</h1>
        <p className="text-sm opacity-90">Manage your academy efficiently</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const colorClasses = {
            blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-500', border: 'border-blue-500' },
            green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-500', border: 'border-green-500' },
            purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-500', border: 'border-purple-500' },
            orange: { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-500', border: 'border-orange-500' },
          }[stat.color] || { bg: 'bg-gray-500', light: 'bg-gray-100', text: 'text-gray-500', border: 'border-gray-500' };

          return (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${colorClasses.border}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {isLoading ? '...' : stat.value}
                  </p>
                </div>
                <div className={`${colorClasses.light} p-3 rounded-lg`}>
                  <i className={`${stat.icon} text-2xl ${colorClasses.text}`}></i>
                </div>
              </div>
              {stat.link && (
                <Link
                  to={stat.link}
                  className={`text-xs ${colorClasses.text} hover:opacity-80 font-medium mt-3 inline-block`}
                >
                  View Details →
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-clock text-blue-600 mr-2"></i>
            Recent Activity
          </h3>
          <p className="text-gray-500 text-sm py-6 text-center">No recent activity</p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-bolt text-blue-600 mr-2"></i>
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link
              to={ROUTES.ADMIN.ENQUIRIES}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <i className="fas fa-users text-gray-400 group-hover:text-blue-600"></i>
                <span className="text-sm font-medium text-gray-700">View Enquiries</span>
              </div>
              <i className="fas fa-arrow-right text-gray-300 group-hover:text-blue-600"></i>
            </Link>
            <Link
              to={ROUTES.ADMIN.MESSAGES}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-gray-400 group-hover:text-blue-600"></i>
                <span className="text-sm font-medium text-gray-700">View Messages</span>
              </div>
              <i className="fas fa-arrow-right text-gray-300 group-hover:text-blue-600"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
