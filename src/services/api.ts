import { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS } from '../constants/config';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Get auth token for protected routes
    const token = this.getAuthToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      // Only log in development
      if (import.meta.env?.DEV) {
        console.error('API Error:', error);
      }
      throw error;
    }
  }

  // Enrollment API
  async submitEnrollment(enrollmentData: {
    name: string;
    phone: string;
    course: string;
    courseFee: string;
    message?: string;
  }) {
    return this.request(API_ENDPOINTS.ENQUIRIES.BASE, {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  }

  // Contact API
  async submitContactMessage(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    course?: string;
    message: string;
    newsletter?: boolean;
  }) {
    return this.request(API_ENDPOINTS.CONTACT.BASE, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Auth API
  async login(credentials: { userid: string; password: string }) {
    return this.request(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getMe(token: string) {
    return this.request(API_ENDPOINTS.AUTH.ME, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Protected API calls (require authentication)
  async getEnquiries(token: string, params?: { status?: string; page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `${API_ENDPOINTS.ENQUIRIES.BASE}${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getContactMessages(token: string, params?: { status?: string; page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `${API_ENDPOINTS.CONTACT.BASE}${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateEnquiryStatus(token: string, id: string, status: string) {
    return this.request(API_ENDPOINTS.ENQUIRIES.UPDATE_STATUS(id), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  }

  async updateContactMessageStatus(token: string, id: string, status: string) {
    return this.request(API_ENDPOINTS.CONTACT.UPDATE_STATUS(id), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  }

  // User Management API
  async getUsers() {
    return this.request(API_ENDPOINTS.USERS.BASE, {
      method: 'GET',
    });
  }

  async createUser(userData: {
    userid: string;
    password: string;
    role?: string;
    status?: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: {
    userid?: string;
    password?: string;
    role?: string;
    status?: string;
  }) {
    return this.request(API_ENDPOINTS.USERS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(API_ENDPOINTS.USERS.DELETE(id), {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
