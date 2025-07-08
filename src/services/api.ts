import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Configuration axios avec intercepteurs
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  // Inscription
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Connexion
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtenir le profil utilisateur
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Service des produits
export const productsService = {
  // Obtenir tous les produits
  getAll: async (params?: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Obtenir un produit par ID
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Obtenir les catégories
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Obtenir les marques
  getBrands: async () => {
    const response = await api.get('/products/brands');
    return response.data;
  },

  // Obtenir les produits en vedette
  getFeatured: async () => {
    try {
      console.log('Fetching featured products...');
      const response = await api.get('/products/featured');
      console.log('Featured products response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Obtenir les produits en promotion
  getOnSale: async () => {
    const response = await api.get('/products/on-sale');
    return response.data;
  },

  // Obtenir les produits par catégorie
  getByCategory: async (category: string) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  // Obtenir les produits en relation
  getRelated: async (productId: string, category: string, limit: number = 4) => {
    try {
      const response = await api.get(`/products/related/${productId}`, {
        params: { category, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  },
};

// Service des commandes
export const ordersService = {
  // Créer une commande
  create: async (orderData: {
    items: Array<{
      product: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
      sku: string;
    }>;
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
      phone?: string;
    };
    subtotal: number;
    tax: number;
    shippingCost: number;
    total: number;
    paymentMethod: 'card' | 'paypal' | 'cash';
    notes?: string;
  }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Obtenir les commandes de l'utilisateur
  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  // Obtenir une commande par ID
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// Service des utilisateurs (admin seulement)
export const usersService = {
  // Obtenir tous les utilisateurs
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Obtenir un utilisateur par ID
  getById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Mettre à jour un utilisateur
  update: async (id: string, userData: any) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },

  // Supprimer un utilisateur
  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default api; 