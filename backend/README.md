# E-commerce Backend API

Backend API pour l'application e-commerce construite avec NestJS et MongoDB.

## 🚀 Technologies

- **NestJS** - Framework Node.js pour construire des applications serveur
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par token
- **Passport** - Stratégies d'authentification
- **bcryptjs** - Hashage des mots de passe
- **class-validator** - Validation des données

## 📋 Prérequis

- Node.js (v16 ou supérieur)
- MongoDB (local ou cloud)
- npm ou yarn

## 🛠️ Installation

1. **Cloner le projet**
```bash
cd backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
Créer un fichier `.env` à la racine du projet :
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Server
PORT=3001

# Environment
NODE_ENV=development
```

4. **Démarrer MongoDB**
Assurez-vous que MongoDB est en cours d'exécution sur votre machine.

## 🚀 Démarrage

### Mode développement
```bash
npm run start:dev
```

### Mode production
```bash
npm run build
npm run start:prod
```

## 🌱 Seeding de la base de données

Pour initialiser la base de données avec des données de test :

```bash
npm run seed
```

Cela créera :
- 1 utilisateur admin (admin@example.com / admin123)
- 2 utilisateurs clients
- 8 produits de test

## 📚 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil utilisateur (authentifié)

### Utilisateurs (Admin seulement)
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/:id` - Détails d'un utilisateur
- `POST /api/users` - Créer un utilisateur
- `PATCH /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Produits
- `GET /api/products` - Liste des produits (avec filtres)
- `GET /api/products/:id` - Détails d'un produit
- `GET /api/products/categories` - Liste des catégories
- `GET /api/products/brands` - Liste des marques
- `GET /api/products/featured` - Produits en vedette
- `GET /api/products/on-sale` - Produits en promotion
- `GET /api/products/category/:category` - Produits par catégorie
- `GET /api/products/low-stock` - Produits en stock faible (Admin)
- `POST /api/products` - Créer un produit (Admin)
- `PATCH /api/products/:id` - Modifier un produit (Admin)
- `DELETE /api/products/:id` - Supprimer un produit (Admin)

### Commandes
- `POST /api/orders` - Créer une commande (authentifié)
- `GET /api/orders` - Liste des commandes (Admin)
- `GET /api/orders/my-orders` - Mes commandes (authentifié)
- `GET /api/orders/:id` - Détails d'une commande
- `GET /api/orders/stats` - Statistiques des commandes (Admin)
- `GET /api/orders/recent` - Commandes récentes (Admin)
- `PATCH /api/orders/:id` - Modifier une commande (Admin)
- `DELETE /api/orders/:id` - Supprimer une commande (Admin)

## 🔐 Authentification

L'API utilise JWT pour l'authentification. Incluez le token dans le header Authorization :

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Modèles de données

### User
```typescript
{
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  isActive: boolean;
  phone?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastLogin?: Date;
}
```

### Product
```typescript
{
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
  isActive: boolean;
  rating: number;
  reviewCount: number;
  soldCount: number;
  isFeatured: boolean;
  isOnSale: boolean;
  discountPercentage?: number;
}
```

### Order
```typescript
{
  user: ObjectId;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'card' | 'paypal' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  returnReason?: string;
  returnDate?: Date;
  notes?: string;
  isReturned: boolean;
}
```

## 🔧 Scripts disponibles

- `npm run start` - Démarrer l'application
- `npm run start:dev` - Démarrer en mode développement avec hot reload
- `npm run start:debug` - Démarrer en mode debug
- `npm run start:prod` - Démarrer en mode production
- `npm run build` - Compiler l'application
- `npm run test` - Exécuter les tests
- `npm run test:watch` - Exécuter les tests en mode watch
- `npm run test:cov` - Exécuter les tests avec couverture
- `npm run lint` - Linter le code
- `npm run format` - Formater le code

## 🌐 CORS

L'API est configurée pour accepter les requêtes depuis :
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (React dev server)

## 📝 Validation

L'API utilise class-validator pour la validation des données entrantes. Tous les DTOs incluent des validations appropriées.

## 🔒 Sécurité

- Mots de passe hashés avec bcrypt
- JWT pour l'authentification
- Validation des données entrantes
- Gestion des rôles (admin/customer)
- Protection CORS

## 🚀 Déploiement

1. Configurer les variables d'environnement de production
2. Construire l'application : `npm run build`
3. Démarrer en mode production : `npm run start:prod`

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository. 