import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import Swal from 'sweetalert2'
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, LivrosdetailsComponent],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss'
})
export class LivroslistComponent {

  lista : Livro[] = [];
  livroEdit : Livro = new Livro(0,"");

  modalService = inject(MdbModalService);
  @ViewChild("modalLivrosDetalhe") modalLivrosDetalhe !: TemplateRef<any>;
  modalRef !: MdbModalRef<any>;

  constructor(){


    this.lista.push(new Livro(1, 'Harry Potter e a Pedra Filosofal'));
    this.lista.push(new Livro(2, 'O Hobbit'));
    this.lista.push(new Livro(3, 'Pequeno Principe'));
    this.lista.push(new Livro(4, 'A cabana'));

    let livroNovo = history.state.livroNovo;
    let livroEditado = history.state.livroEditado;

    if(livroNovo){
      livroNovo.id=123;
      this.lista.push(livroNovo);

    }

    if(livroEditado){
      let indice = this.lista.findIndex(x => {return x.id ==  livroEditado.id});
      this.lista[indice] = livroEditado;
    }
   

  }

  deletar(livro : Livro){
    Swal.fire({
      title: 'Tem certeza eu deseja deletar este livro?!',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      denyButtonText: "Nao!",

    }).then((result) => {
      if (result.isConfirmed) {
          let indice = this.lista.findIndex(x => {return x.id ==  livro.id});
          this.lista.splice(indice, 1 );        
      }});

    
  }
  new(){
    this.livroEdit = new Livro(0, "");
    this.modalRef = this.modalService.open(this.modalLivrosDetalhe);
  }
  edit(livro:Livro){
    this.livroEdit = Object.assign({}, livro);
    this.modalRef = this.modalService.open(this.modalLivrosDetalhe);
  }
  retornoDetalhe(livro : Livro){
    this.modalRef.close();

    if(livro.id>0){
      let indice = this.lista.findIndex(x => {return x.id == livro.id});
      this.lista[indice] = livro;
    }else{
      livro.id = 123;
      this.lista.push(livro);
    }
  }
}
