import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Configuration axios avec token d'authentification
const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types pour les données admin
export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  stockStats?: {
    totalItems: number;
    availableItems: number;
    lowStockItems: number;
    outOfStockItems: number;
  };
  recentOrders: Array<{
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastLogin?: Date;
  isActive: boolean;
  createdAt: string;
}

export interface AdminOrder {
  _id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface AdminProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  sku: string;
  brand: string;
  category: string;
  image: string;
  images: string[];
  weight: number;
  dimensions: string;
  tags: string[];
  isFeatured: boolean;
  isOnSale: boolean;
  discountPercentage?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSettings {
  storeName: string;
  storeDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  website: string;
  currency: string;
  taxRate: number;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  cashOnDelivery: boolean;
  emailNotifications: boolean;
  orderConfirmations: boolean;
  lowStockAlerts: boolean;
  newUserRegistrations: boolean;
}

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<AdminStats> => {
    const response = await adminApi.get('/admin/dashboard/stats');
    return response.data;
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<AdminUser[]> => {
    const response = await adminApi.get('/admin/users');
    return response.data;
  },

  getById: async (id: string): Promise<AdminUser> => {
    const response = await adminApi.get(`/admin/users/${id}`);
    return response.data;
  },

  update: async (id: string, userData: Partial<AdminUser>): Promise<AdminUser> => {
    const response = await adminApi.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await adminApi.delete(`/admin/users/${id}`);
  },

  toggleStatus: async (id: string): Promise<AdminUser> => {
    const response = await adminApi.patch(`/admin/users/${id}/toggle-status`);
    return response.data;
  },
};

// Orders API
export const ordersApi = {
  getAll: async (): Promise<AdminOrder[]> => {
    const response = await adminApi.get('/admin/orders');
    return response.data;
  },

  getById: async (id: string): Promise<AdminOrder> => {
    const response = await adminApi.get(`/admin/orders/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: AdminOrder['status']): Promise<AdminOrder> => {
    const response = await adminApi.patch(`/admin/orders/${id}/status`, { status });
    return response.data;
  },

  updatePaymentStatus: async (id: string, paymentStatus: AdminOrder['paymentStatus']): Promise<AdminOrder> => {
    const response = await adminApi.patch(`/admin/orders/${id}/payment-status`, { paymentStatus });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await adminApi.delete(`/admin/orders/${id}`);
  },
};

// Products API
export const adminProductsApi = {
  getAll: async (): Promise<AdminProduct[]> => {
    const response = await adminApi.get('/admin/products');
    return response.data;
  },

  getById: async (id: string): Promise<AdminProduct> => {
    const response = await adminApi.get(`/admin/products/${id}`);
    return response.data;
  },

  create: async (productData: Omit<AdminProduct, '_id' | 'createdAt' | 'updatedAt'>): Promise<AdminProduct> => {
    const response = await adminApi.post('/admin/products', productData);
    return response.data;
  },

  update: async (id: string, productData: Partial<AdminProduct>): Promise<AdminProduct> => {
    const response = await adminApi.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await adminApi.delete(`/admin/products/${id}`);
  },

  toggleFeatured: async (id: string): Promise<AdminProduct> => {
    const response = await adminApi.patch(`/admin/products/${id}/toggle-featured`);
    return response.data;
  },

  toggleSale: async (id: string): Promise<AdminProduct> => {
    const response = await adminApi.patch(`/admin/products/${id}/toggle-sale`);
    return response.data;
  },

  updateStock: async (id: string, stock: number): Promise<AdminProduct> => {
    const response = await adminApi.patch(`/admin/products/${id}/stock`, { stock });
    return response.data;
  },
};

// Settings API
export const settingsApi = {
  get: async (): Promise<AdminSettings> => {
    const response = await adminApi.get('/admin/settings');
    return response.data;
  },

  update: async (settings: AdminSettings): Promise<AdminSettings> => {
    const response = await adminApi.put('/admin/settings', settings);
    return response.data;
  },
};

export default adminApi; 