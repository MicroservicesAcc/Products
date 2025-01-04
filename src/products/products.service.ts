import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  async findAll(page = 1, limit = 10) {
    const total = await this.product.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data: await this.product.findMany({
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
      }),
      totalPages,
      total,
      next: page && limit ? +page < totalPages : undefined,
      prev: page && limit ? +page > 1 : undefined,
    }
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.product.findFirst({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return await this.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const product = await this.product.findFirst({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return await this.product.update({ where: { id }, data: { active: false } });
  }
}
