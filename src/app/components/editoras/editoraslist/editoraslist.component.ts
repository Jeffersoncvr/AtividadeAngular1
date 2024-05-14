import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Editora } from '../../../models/editora';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { EditorasdetailsComponent } from '../editorasdetails/editorasdetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

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

  constructor(){
    this.lista.push(new Editora(1, 'Suma'));
    this.lista.push(new Editora(2, "LaFonte"));
    this.lista.push(new Editora(3,'Arqueiro'));

    let editoraNova = history.state.editoraNova;
    let editoraEditada = history.state.editoraEditada;

    if(editoraNova){
      editoraNova.id=123;
      this.lista.push(editoraNova);

    }

    if(editoraEditada){
      let indice = this.lista.findIndex(x => {return x.id ==  editoraEditada.id});
      this.lista[indice] = editoraEditada;
    }


  }

  deletar(editora : Editora){

    Swal.fire({
      title: 'Tem certeza eu deseja deletar esta editora?!',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      denyButtonText: "Nao!",

    }).then((result) => {
      if (result.isConfirmed) {
          let indice = this.lista.findIndex(x => {return x.id ==  editora.id});
          this.lista.splice(indice, 1 );        
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
    this.modalRef.close();

    if(editora.id>0){
      let indice = this.lista.findIndex(x => {return x.id == editora.id});
      this.lista[indice] = editora;
    }else{
      editora.id = 123;
      this.lista.push(editora);
    }
  }
}
