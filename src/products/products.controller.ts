import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // @Post()
  @MessagePattern('create-product')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern('find-all-products')
  findAll(@Payload() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return this.productsService.findAll(page, limit);
  }

  // @Get(':id')
  @MessagePattern('find-one-product')
  findOne(@Payload('id') id: number) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern('update-product')
  update(@Payload() updateProductDto: UpdateProductDto) {
    const { id } = updateProductDto;
    return this.productsService.update(+id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern('remove-product')
  remove(@Payload('id') id: number) {
    return this.productsService.remove(+id);
  }
}
