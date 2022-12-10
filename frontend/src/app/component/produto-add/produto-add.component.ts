import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/produto';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

            //  FORMATADOR DE DATA
            @Injectable()
            export class FormatDateAdapter extends NgbDateAdapter<string> {

              readonly DELIMITER = '/';

              fromModel(value: string | null): NgbDateStruct | null {
                if (value) {
                  let date = value.split(this.DELIMITER);
                  return {
                    day: parseInt(date[0], 10),
                    month: parseInt(date[1], 10),
                    year: parseInt(date[2], 10)
                  };
                }
                return null;
              }


              toModel(date: NgbDateStruct | null): string | null {
                return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
              }


            }

            //  Formatador de data
            @Injectable()
            export class FormataData extends NgbDateParserFormatter {

              readonly DELIMITER = '/'; // 18/10/1987



              parse(value: string): NgbDateStruct | null {

                if (value) {
                  let date = value.split(this.DELIMITER);
                  return {
                    day: parseInt(date[0], 10),
                    month: parseInt(date[1], 10),
                    year: parseInt(date[2], 10)
                  };
                }
                return null;
              }

              format(date: NgbDateStruct): string {

                return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
              }

              toModel(date: NgbDateStruct | null): string | null {
                return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
              }

            }

            // Formatador de data
            function validarDia(valor:number) {
            if (valor != null && valor <= 9) {
              return '0' + valor;
            } else {
              return valor;
            }
            }
            // --- FIM FORMATADOR DE DATA


@Component({
  selector: 'app-produto-add',
  templateUrl: './produto-add.component.html',
  styleUrls: ['./produto-add.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass:FormataData},
    {provide:NgbDateAdapter, useClass:FormatDateAdapter}]
})
export class ProdutoAddComponent implements OnInit {

  produto= new Produto();

  constructor(private routeActive: ActivatedRoute, private produtoService: ProdutoService) { }
  

  ngOnInit(){
    
    let id = this.routeActive.snapshot.paramMap.get('id')
    
    if(id != null){

      // Carrega Produto
      this.produtoService.consultaProdutoById(parseInt(id)).subscribe(data=>{
        this.produto = data;
        console.log(data)
      })
      
      console.log(id)
    }else{
      this.novoProduto()
    }

  }

  // SALVAR PRODUTO
  salvarProduto(){

    if(this.produto.id == null){// salvar
      this.produtoService.salvarProduto(this.produto).subscribe(data=>{
        this.novoProduto()
        console.info('Salvo com sucesso: '+data)
      })
    }else{// editar
      this.produtoService.editarUsuario(this.produto).subscribe(data=>{
        this.novoProduto()
        console.info('Editado com sucesso: '+data)
      })
    }



  }

  // NOVO USUARIO
  novoProduto(){
    this.produto = new Produto();
  }



}
