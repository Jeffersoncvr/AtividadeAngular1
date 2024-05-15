import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Editora } from '../../../models/editora';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { EditorasdetailsComponent } from '../editorasdetails/editorasdetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EditoraService } from '../../../services/editora.service';

@Component({
  selector: 'app-editoraslist',
  standalone: true,
  imports: [RouterLink,MdbModalModule, EditorasdetailsComponent],
  templateUrl: './editoraslist.component.html',
  styleUrl: './editoraslist.component.scss'
})
export class EditoraslistComponent {

  lista: Editora[] = [];
  editoraEdit : Editora = new Editora(0,"");

  modalService = inject(MdbModalService);
  @ViewChild("editoraLivrosDetalhe") editoraLivrosDetalhe !: TemplateRef<any>;
  modalRef !: MdbModalRef<any>;


  editoraService = inject(EditoraService);

  constructor(){
    
    this.listAll();

    let editoraNova = history.state.editoraNova;
    let editoraEditada = history.state.editoraEditada;

    if(editoraNova){
      this.lista.push(editoraNova);

    }

    if(editoraEditada){
      let indice = this.lista.findIndex(x => {return x.id ==  editoraEditada.id});
      this.lista[indice] = editoraEditada;
    }


  }

  deleteById(editora : Editora){

    Swal.fire({
      title: 'Tem certeza eu deseja deletar esta editora?!',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      denyButtonText: "Nao!",

    }).then((result) => {
      if (result.isConfirmed) {
        this.editoraService.delete(editora.id).subscribe({
          next: retorno => {
  
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.listAll();
          },
          error: erro => {
  
            alert(erro.status);
            console.log(erro);
           
            Swal.fire({
              title: 'Erro ao deletar o livro!',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
  
          }
        } );      
      }});
  }
  new(){
    this.editoraEdit = new Editora(0, "");
    this.modalRef = this.modalService.open(this.editoraLivrosDetalhe);
  }
  edit(editora:Editora){
    this.editoraEdit = Object.assign({}, editora);
    this.modalRef = this.modalService.open(this.editoraLivrosDetalhe);
  }
  retornoDetalhe(editora : Editora){
    this.listAll();
    this.modalRef.close();
  }
  listAll(){

    this.editoraService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Erro ao retornar editoras!');
      }

    } );

}
}
