import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  
  pagina: number = 1; 
  total: number = 1;
  listaProduto:any;
  campoPesquisa= new String;

  constructor(private produtoService: ProdutoService){}

  ngOnInit(){

    this.listarProduto()
  }

  // LISTA PRODUTO
  listarProduto(){
    this.produtoService.listaProdutoPage(this.pagina - 1).subscribe(data =>{
      
      this.listaProduto = data.content;
      this.total = data.totalElements;
      console.info(data)

    });
  }

  // LISTA PRODUTO PAGINACAO
  listarProdutoPaginacao(pagina: number){

    this.produtoService.listaProdutoPage(this.pagina - 1).subscribe(data =>{
      
      this.listaProduto = data.content;
      this.total = data.totalElements;
      console.info(data)

    });
    console.info("Página : " + pagina);
 }

 // DELETAR PRODUTO
 deletarProduto(id: Number){

  if (id !== null && confirm("Tem certeza que deseja remover?")) {
    
    this.produtoService.deletarProduto(id).subscribe(data =>{
    
      console.log(data)

      this.listarProduto()
    });

  }

}

// CONSULTA PRODUTO POR NOME
consultaProdutoByNome(){

  if(this.campoPesquisa == ''){
    this.listarProduto()
  }else{

    this.produtoService.consultaProdutoByNome(this.campoPesquisa).subscribe(data =>{

      this.listaProduto = data;

    });
    
  }

  
}



}
