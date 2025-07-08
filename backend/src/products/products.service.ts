import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check if SKU already exists
    const existingProduct = await this.productModel.findOne({ sku: createProductDto.sku });
    if (existingProduct) {
      throw new ConflictException('Product with this SKU already exists');
    }

    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(query?: any): Promise<Product[]> {
    const filter: any = { isActive: true };

    if (query.category) {
      filter.category = query.category;
    }

    if (query.brand) {
      filter.brand = query.brand;
    }

    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = parseFloat(query.minPrice);
      if (query.maxPrice) filter.price.$lte = parseFloat(query.maxPrice);
    }

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { brand: { $regex: query.search, $options: 'i' } },
      ];
    }

    return this.productModel.find(filter).exec();
  }

  async findAllForAdmin(): Promise<Product[]> {
    // Pour l'admin, on récupère tous les produits sans filtre isActive
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category, isActive: true }).exec();
  }

  async findFeatured(): Promise<Product[]> {
    return this.productModel.find({ isFeatured: true, isActive: true }).exec();
  }

  async findOnSale(): Promise<Product[]> {
    return this.productModel.find({ isOnSale: true, isActive: true }).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // Check if SKU is being updated and if it already exists
    if ((updateProductDto as any).sku) {
      const existingProduct = await this.productModel.findOne({ 
        sku: (updateProductDto as any).sku,
        _id: { $ne: id }
      });
      if (existingProduct) {
        throw new ConflictException('Product with this SKU already exists');
      }
    }

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Product not found');
    }
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Si quantity > 0, on retire du stock, sinon on ajoute (restock)
    if (quantity > 0 && product.stock < quantity) {
      throw new ConflictException('Insufficient stock');
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      {
        $inc: { stock: -quantity, soldCount: quantity },
      },
      { new: true },
    ).exec();

    return updatedProduct;
  }

  async getCategories(): Promise<string[]> {
    const categories = await this.productModel.distinct('category').exec();
    return categories;
  }

  async getBrands(): Promise<string[]> {
    const brands = await this.productModel.distinct('brand').exec();
    return brands;
  }

  async getLowStockProducts(): Promise<Product[]> {
    return this.productModel.find({
      $expr: { $lte: ['$stock', '$minStock'] },
      isActive: true,
    }).exec();
  }

  async count(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async toggleFeatured(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.isFeatured = !product.isFeatured;
    return product.save();
  }

  async toggleSale(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.isOnSale = !product.isOnSale;
    return product.save();
  }

  async setStock(id: string, stock: number): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.stock = stock;
    return product.save();
  }

  async getRelatedProducts(productId: string, query: any): Promise<Product[]> {
    const limit = parseInt(query.limit) || 4;
    const category = query.category;

    // Récupérer des produits de la même catégorie, excluant le produit actuel
    const relatedProducts = await this.productModel
      .find({
        _id: { $ne: productId },
        category: category,
        isActive: true,
      })
      .limit(limit)
      .exec();

    // Si on n'a pas assez de produits de la même catégorie, ajouter d'autres produits
    if (relatedProducts.length < limit) {
      const remainingLimit = limit - relatedProducts.length;
      const additionalProducts = await this.productModel
        .find({
          _id: { $ne: productId },
          category: { $ne: category },
          isActive: true,
        })
        .limit(remainingLimit)
        .exec();

      relatedProducts.push(...additionalProducts);
    }

    return relatedProducts;
  }
} 