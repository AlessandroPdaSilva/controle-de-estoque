import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app-constants';
import { Usuario } from 'src/app/model/usuario';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  pagina: number = 1; 
  total: number = 1;
  listaUsuario:any;
  campoPesquisa= new String;

  @ViewChild('iframeRelatorio') iframeRelatorio!: any;

  constructor(private usuarioService: UsuarioService,private http: HttpClient){}

  

  // INIT
  ngOnInit() {

    this.listarUsuario()
    
  }

  // LISTA USUARIO
  listarUsuario(){
    this.usuarioService.listaUsuarioPage(this.pagina - 1).subscribe(data =>{
      
      this.listaUsuario = data.content;
      this.total = data.totalElements;
      console.info(data)

    });
  }

  // LISTA USUARIO PAGINACAO
  listarUsuarioPaginacao(pagina: number){

    this.usuarioService.listaUsuarioPage(this.pagina - 1).subscribe(data =>{
      
      this.listaUsuario = data.content;
      this.total = data.totalElements;
      console.info(data)

    });
    console.info("Página : " + pagina);
 }




  // DELETAR USUARIO
  deletarUsuario(id: Number){

    if (id !== null && confirm("Tem certeza que deseja remover?")) {
      
      this.usuarioService.deletarUsuario(id).subscribe(data =>{
      
        console.log(data)

        this.listarUsuario()
      });

    }

  }

  // CONSULTA USUARIO POR NOME
  consultaUsuarioByNome(){

    if(this.campoPesquisa == ''){
      this.listarUsuario()
    }else{

      this.usuarioService.consultaUsuarioByNome(this.campoPesquisa).subscribe(data =>{

        this.listaUsuario = data;
  
      });
      
    }

    
  }

  // IMPRIME RELATORIO
  imprimeRelatorio(){
    this.downloadPdfRelatorio();
  }

  downloadPdfRelatorio(){
    return this.http.get(AppConstants.urlRelatorio, {responseType: 'text'}).subscribe(data => {
      //document.querySelector('iframe').src = data;
      //window.open(data)

      this.iframeRelatorio.nativeElement.contentDocument.location.href = data
      console.log(this.iframeRelatorio)
    })
  }

  


}
