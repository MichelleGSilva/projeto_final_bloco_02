import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";


@Controller("/produtos") // Indica que a classe e uma controller
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService) { }

    @Get()
    @HttpCode(HttpStatus.OK) 
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();

    }

    @Get("/:id") 
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);

    }
    
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK) 
    searchByName(@Param('nome') nome: string): Promise<Produto[]> {
        return this.produtoService.searchByName(nome);

    }

    @Post()
    @HttpCode(HttpStatus.CREATED) 
    create(@Body() produto: Produto): Promise<Produto> {
      return this.produtoService.create(produto);
    }

    @Put('/:id') // Mapeia todas as requisições do HTTP PUT    
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto); 
     }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) 
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtoService.delete(id); 
    }
}