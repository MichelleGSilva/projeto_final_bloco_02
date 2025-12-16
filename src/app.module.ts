import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

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
  entities: [],
  synchronize: true,
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
