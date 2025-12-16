import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, DeleteResult } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

  
    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id }
        });

        if (!usuario) {
            throw new HttpException(
                'Usuário não encontrado!',
                HttpStatus.NOT_FOUND
            );
        }

        return usuario;
    }

    // Busca interna (SEM exception) - usada em create/update
    async findByNomeECargoSemException(
        nome: string,
        cargo: string
    ): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                nome: Like(`%${nome}%`),
                cargo: Like(`%${cargo}%`)
            }
        });
    }

    // Busca pública (COM exception) - usada no controller
    async findByNomeECargo(nome: string, cargo: string): Promise<Usuario> {
        const usuario = await this.findByNomeECargoSemException(nome, cargo);

        if (!usuario) {
            throw new HttpException(
                'Usuário não encontrado!',
                HttpStatus.NOT_FOUND
            );
        }

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        const usuarioExistente = await this.findByNomeECargoSemException(
            usuario.nome,
            usuario.cargo
        );

        if (usuarioExistente) {
            throw new HttpException(
                'Usuário já cadastrado com este nome e cargo!',
                HttpStatus.BAD_REQUEST
            );
        }

        return await this.usuarioRepository.save(usuario);
    }

    async update(id: number, usuario: Usuario): Promise<Usuario> {
        await this.findById(id);

        const usuarioExistente = await this.findByNomeECargoSemException(
            usuario.nome,
            usuario.cargo
        );

        if (usuarioExistente && usuarioExistente.id !== id) {
            throw new HttpException(
                'Já existe outro usuário com este nome e cargo!',
                HttpStatus.BAD_REQUEST
            );
        }

        return await this.usuarioRepository.save({ ...usuario, id });
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.usuarioRepository.delete(id);
    }
}
