import { IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "../../produto/entities/produto.entity"


@Entity({ name: "tb_usuarios" })    // Indicando que a classe é uma Entitidade/Model
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    cargo: string

    @Column({ length: 500, nullable: true })
    foto: string

    @Column({ default: true })
    ativo: boolean

    @OneToMany(() => Produto, (produto) => produto.usuario)
    produtos: Produto[]

}