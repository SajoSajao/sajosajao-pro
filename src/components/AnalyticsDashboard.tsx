import React, { useEffect, useState } from 'react';
import { trackEvent } from '../utils/analytics';

interface AnalyticsDashboardProps {
  className?: string;
}

interface AnalyticsData {
  pageViews: number;
  enrollments: number;
  contactForms: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: { page: string; views: number; }[];
  topCourses: { course: string; interest: number; }[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className = '' }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // This would typically call your backend API that integrates with Google Analytics API
      // For demo purposes, showing mock data
      const mockData: AnalyticsData = {
        pageViews: 1250,
        enrollments: 15,
        contactForms: 28,
        bounceRate: 35.8,
        avgSessionDuration: '2m 45s',
        topPages: [
          { page: '/courses', views: 450 },
          { page: '/', views: 380 },
          { page: '/contact', views: 220 },
          { page: '/course-details/basic', views: 150 },
          { page: '/course-details/advanced', views: 50 }
        ],
        topCourses: [
          { course: 'Basic Beautician Course', interest: 85 },
          { course: 'Advanced Beautician Course', interest: 65 },
          { course: 'Professional Makeup', interest: 45 },
          { course: 'Hair Styling', interest: 30 }
        ]
      };

      // Simulate API delay
      setTimeout(() => {
        setAnalyticsData(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      setLoading(false);
    }
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    trackEvent('analytics_filter', 'Admin Dashboard', `Date Range: ${range}`);
  };

  const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: string; 
    color: string;
    change?: string;
  }> = ({ title, value, icon, color, change }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change} vs last period
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
          <i className={`${icon} text-white text-xl`}></i>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className={`text-center text-gray-500 ${className}`}>
        Failed to load analytics data. Please try again.
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => handleDateRangeChange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                dateRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Page Views"
          value={analyticsData.pageViews.toLocaleString()}
          icon="fas fa-eye"
          color="bg-blue-500"
          change="+12%"
        />
        <StatCard
          title="Enrollments"
          value={analyticsData.enrollments}
          icon="fas fa-graduation-cap"
          color="bg-green-500"
          change="+8%"
        />
        <StatCard
          title="Contact Forms"
          value={analyticsData.contactForms}
          icon="fas fa-envelope"
          color="bg-purple-500"
          change="+15%"
        />
        <StatCard
          title="Bounce Rate"
          value={`${analyticsData.bounceRate}%`}
          icon="fas fa-chart-line"
          color="bg-orange-500"
          change="-5%"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-chart-bar text-blue-500 mr-2"></i>
            Top Pages
          </h3>
          <div className="space-y-3">
            {analyticsData.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-900">{page.page}</span>
                </div>
                <span className="font-semibold text-gray-600">{page.views}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Interest */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <i className="fas fa-heart text-red-500 mr-2"></i>
            Course Interest
          </h3>
          <div className="space-y-3">
            {analyticsData.topCourses.map((course, index) => (
              <div key={course.course} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-900">{course.course}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-600 mr-2">{course.interest}</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
                      style={{ width: `${(course.interest / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-tachometer-alt text-green-500 mr-2"></i>
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{analyticsData.avgSessionDuration}</div>
            <div className="text-sm text-gray-600">Avg. Session Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {((analyticsData.enrollments / analyticsData.pageViews) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Enrollment Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {((analyticsData.contactForms / analyticsData.pageViews) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Contact Rate</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => trackEvent('analytics_action', 'Admin Dashboard', 'Export Data')}
            className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-center transition-colors"
          >
            <i className="fas fa-download text-xl mb-2 block"></i>
            Export Data
          </button>
          <button 
            onClick={() => trackEvent('analytics_action', 'Admin Dashboard', 'View Reports')}
            className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-center transition-colors"
          >
            <i className="fas fa-chart-pie text-xl mb-2 block"></i>
            View Reports
          </button>
          <button 
            onClick={() => trackEvent('analytics_action', 'Admin Dashboard', 'Setup Alerts')}
            className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-center transition-colors"
          >
            <i className="fas fa-bell text-xl mb-2 block"></i>
            Setup Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;