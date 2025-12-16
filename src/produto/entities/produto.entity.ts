import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity ({ name: "tb_produtos"}) 
export class Produto {

    @PrimaryGeneratedColumn() // Chave Primaria e Auto incremental
    id: number;

    @IsNotEmpty() 
    @Column({ length: 100, nullable: false}) 
    nome: string;

    @IsNotEmpty() 
    @Column({ length: 255, nullable: false}) // Regra do MySQL - NOT NULL
    descricao: string;

    @IsNotEmpty() 
    @Column('decimal', { precision: 10, scale: 2 })
    preco: number;

    @IsNotEmpty() 
    @Column()
    estoque: number;

    @Column({ default: false })
    remedioControlado: boolean;

    @ManyToOne(() => Categoria)
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;
}