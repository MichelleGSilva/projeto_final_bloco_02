import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";

@Controller("/usuarios")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @Get('/busca/:nome/:cargo')
  @HttpCode(HttpStatus.OK)
  async findByNomeECargo(
    @Param('nome') nome: string, 
    @Param('cargo') cargo: string): Promise<Usuario> {
    return this.usuarioService.findByNomeECargo(nome, cargo);
}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id:number,
    @Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(id, usuario);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.usuarioService.delete(id);
  }

}