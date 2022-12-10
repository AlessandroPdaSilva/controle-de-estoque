import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  // LISTA PRODUTOS
  listaProduto(): Observable<any> {
    return this.http.get<any>(AppConstants.urlProduto)
  }

  // LISTA PRODUTOS PAGINACAO
  listaProdutoPage(pagina: number): Observable<any> {
    return this.http.get<any>(AppConstants.urlProduto + 'page/'+ pagina)
  }

  // DELETAR PRODUTO
  deletarProduto(id: Number): Observable<any> {
    return this.http.delete(AppConstants.urlProduto + id, {responseType: 'text'})

  }

  // CONSULTA PRODUTO POR NOME
  consultaProdutoByNome(nome: String): Observable<any> {
    return this.http.get<any>(AppConstants.urlProduto+'consultaByNome/'+nome)
  }

  // CONSULTA PRODUTO POR ID
  consultaProdutoById(id: Number): Observable<any> {
    return this.http.get<any>(AppConstants.urlProduto+ id)
  }

  // SALVAR PRODUTO
  salvarProduto(produto: Produto): Observable<any> {
    return this.http.post<any>(AppConstants.urlProduto,produto)
  }

  // EDITAR PRODUTO
  editarUsuario(produto: Produto): Observable<any> {
    return this.http.put<any>(AppConstants.urlProduto,produto)
  }

  
  

}
