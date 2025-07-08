import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async seed() {
    await this.seedUsers();
    await this.seedProducts();
    console.log('Database seeded successfully!');
  }

  private async seedUsers() {
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        phone: '+1234567890',
        address: '123 Admin Street, Admin City',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        phone: '+1234567891',
        address: '456 Customer Ave, Customer City',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        phone: '+1234567892',
        address: '789 User Blvd, User City',
      },
    ];

    for (const user of users) {
      const existingUser = await this.userModel.findOne({ email: user.email });
      if (!existingUser) {
        await this.userModel.create(user);
      }
    }
  }

  private async seedProducts() {
    const products = [
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system and A17 Pro chip',
        price: 999.99,
        stock: 50,
        minStock: 10,
        sku: 'IPHONE-15-PRO-001',
        brand: 'Apple',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        ],
        weight: 187,
        dimensions: '146.7 x 71.5 x 8.25 mm',
        tags: ['smartphone', 'apple', '5g', 'camera'],
        isFeatured: true,
        isOnSale: false,
      },
      {
        name: 'MacBook Air M2',
        description: 'Ultra-thin laptop with M2 chip for incredible performance',
        price: 1199.99,
        stock: 30,
        minStock: 5,
        sku: 'MACBOOK-AIR-M2-001',
        brand: 'Apple',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
        ],
        weight: 1247,
        dimensions: '304.1 x 215 x 11.3 mm',
        tags: ['laptop', 'apple', 'm2', 'ultrabook'],
        isFeatured: true,
        isOnSale: true,
        discountPercentage: 10,
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Premium Android smartphone with AI features',
        price: 899.99,
        stock: 40,
        minStock: 8,
        sku: 'SAMSUNG-S24-001',
        brand: 'Samsung',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        ],
        weight: 168,
        dimensions: '147 x 70.6 x 7.6 mm',
        tags: ['smartphone', 'samsung', '5g', 'ai'],
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Air Max technology',
        price: 129.99,
        stock: 100,
        minStock: 20,
        sku: 'NIKE-AIRMAX-270-001',
        brand: 'Nike',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
        ],
        weight: 320,
        dimensions: 'US 10',
        tags: ['shoes', 'nike', 'running', 'sports'],
        isFeatured: false,
        isOnSale: true,
        discountPercentage: 15,
      },
      {
        name: 'Adidas Ultraboost 22',
        description: 'Premium running shoes with Boost technology',
        price: 179.99,
        stock: 75,
        minStock: 15,
        sku: 'ADIDAS-ULTRABOOST-22-001',
        brand: 'Adidas',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
        images: [
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        ],
        weight: 310,
        dimensions: 'US 10',
        tags: ['shoes', 'adidas', 'running', 'boost'],
        isFeatured: true,
        isOnSale: false,
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Premium noise-cancelling wireless headphones',
        price: 349.99,
        stock: 25,
        minStock: 5,
        sku: 'SONY-WH1000XM5-001',
        brand: 'Sony',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
        ],
        weight: 250,
        dimensions: '254 x 167 x 60 mm',
        tags: ['headphones', 'sony', 'wireless', 'noise-cancelling'],
        isFeatured: true,
        isOnSale: false,
      },
      {
        name: 'Levi\'s 501 Original Jeans',
        description: 'Classic straight-fit jeans in dark wash denim',
        price: 89.99,
        stock: 200,
        minStock: 40,
        sku: 'LEVIS-501-001',
        brand: 'Levi\'s',
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        images: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
          'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
        ],
        weight: 450,
        dimensions: '32x32',
        tags: ['jeans', 'levis', 'denim', 'casual'],
        isFeatured: false,
        isOnSale: true,
        discountPercentage: 20,
      },
      {
        name: 'Ray-Ban Aviator Classic',
        description: 'Timeless aviator sunglasses with UV protection',
        price: 159.99,
        stock: 60,
        minStock: 12,
        sku: 'RAYBAN-AVIATOR-001',
        brand: 'Ray-Ban',
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
        images: [
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
        ],
        weight: 30,
        dimensions: '58mm',
        tags: ['sunglasses', 'ray-ban', 'aviator', 'classic'],
        isFeatured: true,
        isOnSale: false,
      },
    ];

    for (const product of products) {
      const existingProduct = await this.productModel.findOne({ sku: product.sku });
      if (!existingProduct) {
        await this.productModel.create(product);
      }
    }
  }
} 