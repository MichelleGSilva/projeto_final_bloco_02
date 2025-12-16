import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';

// Decorator - Etiqueta de Metadados
@Module({
  imports: [
    TypeOrmModule.forRoot({ // Configurando o TypeORM
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'db_projetofarmacia',
  entities: [Categoria],
  synchronize: true,
  }),
  CategoriaModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
