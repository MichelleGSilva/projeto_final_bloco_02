import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

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
  entities: [Categoria, Produto, Usuario],
  synchronize: true,
  }),
  CategoriaModule,
  ProdutoModule,
  UsuarioModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
