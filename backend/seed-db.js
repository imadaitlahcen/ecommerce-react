const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27018/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  minStock: { type: Number, required: true, min: 0 },
  sku: { type: String, required: true, trim: true, unique: true },
  brand: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  weight: { type: Number, default: 0 },
  dimensions: String,
  tags: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  soldCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  discountPercentage: { type: Number, min: 0, max: 100 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Sample products data
const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    stock: 50,
    minStock: 10,
    sku: 'WH-001',
    brand: 'TechAudio',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'
    ],
    weight: 0.3,
    dimensions: '18 x 8 x 4 cm',
    tags: ['wireless', 'bluetooth', 'noise-cancellation'],
    isActive: true,
    rating: 4.5,
    reviewCount: 128,
    soldCount: 45,
    isFeatured: true,
    isOnSale: false,
    discountPercentage: 0
  },
  {
    name: 'Smart Watch Series 5',
    description: 'Advanced smartwatch with health monitoring features',
    price: 299.99,
    stock: 30,
    minStock: 5,
    sku: 'SW-002',
    brand: 'TechWear',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400'
    ],
    weight: 0.05,
    dimensions: '4 x 4 x 1 cm',
    tags: ['smartwatch', 'health', 'fitness'],
    isActive: true,
    rating: 4.8,
    reviewCount: 89,
    soldCount: 67,
    isFeatured: true,
    isOnSale: true,
    discountPercentage: 15
  },
  {
    name: 'Laptop Stand Pro',
    description: 'Adjustable laptop stand for better ergonomics',
    price: 79.99,
    stock: 25,
    minStock: 8,
    sku: 'LS-003',
    brand: 'ErgoTech',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400'
    ],
    weight: 0.8,
    dimensions: '30 x 20 x 15 cm',
    tags: ['laptop', 'stand', 'ergonomic'],
    isActive: true,
    rating: 4.2,
    reviewCount: 56,
    soldCount: 23,
    isFeatured: false,
    isOnSale: false,
    discountPercentage: 0
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with customizable switches',
    price: 149.99,
    stock: 40,
    minStock: 12,
    sku: 'KB-004',
    brand: 'GameTech',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
    images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
    ],
    weight: 1.2,
    dimensions: '44 x 13 x 3 cm',
    tags: ['keyboard', 'mechanical', 'gaming', 'rgb'],
    isActive: true,
    rating: 4.6,
    reviewCount: 203,
    soldCount: 89,
    isFeatured: true,
    isOnSale: true,
    discountPercentage: 20
  },
  {
    name: 'Wireless Mouse Pro',
    description: 'Precision wireless mouse with ergonomic design',
    price: 59.99,
    stock: 60,
    minStock: 15,
    sku: 'WM-005',
    brand: 'TechInput',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400'
    ],
    weight: 0.1,
    dimensions: '12 x 6 x 4 cm',
    tags: ['mouse', 'wireless', 'ergonomic'],
    isActive: true,
    rating: 4.4,
    reviewCount: 167,
    soldCount: 134,
    isFeatured: false,
    isOnSale: false,
    discountPercentage: 0
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${createdProducts.length} sample products`);

    console.log('🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 