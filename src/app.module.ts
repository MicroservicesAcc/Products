import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.development.local', '.env.development'],
  }), ProductsModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
