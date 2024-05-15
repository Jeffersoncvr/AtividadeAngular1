import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import Swal from 'sweetalert2'
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import { LivrosService } from '../../../services/livros.service';

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


  livroService = inject(LivrosService);

  constructor(){

    this.listAll();

    let livroNovo = history.state.livroNovo;
    let livroEditado = history.state.livroEditado;

    if(livroNovo){
      this.lista.push(livroNovo);

    }

    if(livroEditado){
      let indice = this.lista.findIndex(x => {return x.id ==  livroEditado.id});
      this.lista[indice] = livroEditado;
    }
   

  }

  deleteById(livro : Livro){
    Swal.fire({
      title: 'Tem certeza eu deseja deletar este livro?!',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      denyButtonText: "Nao!",

    }).then((result) => {
      if (result.isConfirmed) {
        this.livroService.delete(livro.id).subscribe({
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
    this.livroEdit = new Livro(0, "");
    this.modalRef = this.modalService.open(this.modalLivrosDetalhe);
  }
  edit(livro:Livro){
    this.livroEdit = Object.assign({}, livro);
    this.modalRef = this.modalService.open(this.modalLivrosDetalhe);
  }
  retornoDetalhe(livro : Livro){
    this.listAll();
    this.modalRef.close();
    
  }
  listAll(){

      this.livroService.listAll().subscribe({
        next: lista => {
          this.lista = lista;
        },
        error: erro => {
          alert('Erro ao retornar livros!');
        }

      } );

  }
  
}
