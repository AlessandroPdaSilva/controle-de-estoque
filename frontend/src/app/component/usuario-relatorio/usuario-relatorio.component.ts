import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioRelatorio } from 'src/app/model/usuarioRelatorio';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app-constants';




          //  Formatador de data
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
              return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : null;
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





@Component({
  selector: 'app-usuario-relatorio',
  templateUrl: './usuario-relatorio.component.html',
  styleUrls: ['./usuario-relatorio.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass:FormataData},
              {provide:NgbDateAdapter, useClass:FormatDateAdapter}]
})
export class UsuarioRelatorioComponent implements OnInit {

  usuarioRelatorio = new UsuarioRelatorio();

  @ViewChild('iframeRelatorio') iframeRelatorio!: any;

  constructor(private usuarioService: UsuarioService, private http: HttpClient) { }
  
  // INIT 
  ngOnInit() { }

  imprimeRelatorio(){
    console.log(this.usuarioRelatorio.dataFinal)

    if(this.usuarioRelatorio.dataFinal == null){

      // Pegar data atual
      var data = new Date();
      var dia = String(data.getDate()).padStart(2, '0');
      var mes = String(data.getMonth() + 1).padStart(2, '0');
      var ano = data.getFullYear();
      var dataAtual = dia + '/' + mes + '/' + ano;
    

      // injetando em datafinal
      this.usuarioRelatorio.dataFinal = dataAtual

    }

    if(this.usuarioRelatorio.dataInicial == null){
      var dataPadrao = '01/01/1800'
      this.usuarioRelatorio.dataInicial = dataPadrao

      // injetando em datainicial
      console.log(this.usuarioRelatorio.dataInicial)
    }

    // enviando para a API
    this.downloadPdfRelatorioParam(this.usuarioRelatorio);
    
  }


  downloadPdfRelatorioParam(usuarioRelatorio: UsuarioRelatorio){
    return this.http.post(AppConstants.urlRelatorio, usuarioRelatorio, {responseType: 'text'}).subscribe(data => {
      //document.querySelector('iframe').src = data;
      //window.open(data)
      if(this.iframeRelatorio.nativeElement.contentDocument.location.href == "about:blank"){
        this.iframeRelatorio.nativeElement.contentDocument.location.href = data
      }
      
      console.log(this.iframeRelatorio)
    })
  }
  
}
