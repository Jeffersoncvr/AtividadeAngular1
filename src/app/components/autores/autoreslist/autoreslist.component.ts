import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Autor } from '../../../models/autor';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { LivrosdetailsComponent } from '../../livros/livrosdetails/livrosdetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AutoresdetailsComponent } from '../autoresdetails/autoresdetails.component';
import { AutoresService } from '../../../services/autores.service';

@Component({
  selector: 'app-autoreslist',
  standalone: true,
  imports: [RouterLink,MdbModalModule, AutoresdetailsComponent],
  templateUrl: './autoreslist.component.html',
  styleUrl: './autoreslist.component.scss'
})
export class AutoreslistComponent {

  lista : Autor[]= [];
  autorEdit : Autor = new Autor(0,"");

  modalService = inject(MdbModalService);
  @ViewChild("modalAutorDetalhe") modalAutorDetalhe !: TemplateRef<any>;
  modalRef !: MdbModalRef<any>;

  autorService = inject(AutoresService);

  
  constructor(){
   
    this.listAll();

    let autorNovo = history.state.autorNovo;
    let autorEditado = history.state.autorEditado;

    if(autorNovo){
      this.lista.push(autorNovo);

    }

    if(autorEditado){
      let indice = this.lista.findIndex(x => {return x.id ==  autorEditado.id});
      this.lista[indice] = autorEditado;
    }
    
  }

  deleteById(autor : Autor){

    Swal.fire({
      title: 'Tem certeza eu deseja deletar este autor?!',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      denyButtonText: "Nao!",

    }).then((result) => {
      if (result.isConfirmed) {
          this.autorService.delete(autor.id).subscribe({
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
    this.autorEdit = new Autor(0, "");
    this.modalRef = this.modalService.open(this.modalAutorDetalhe);
  }
  edit(autor:Autor){
    this.autorEdit = Object.assign({}, autor);
    this.modalRef = this.modalService.open(this.modalAutorDetalhe);
  }
  retornoDetalhe(autor : Autor){
    this.listAll();
    this.modalRef.close();
  }
  listAll(){

    this.autorService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Erro ao retornar autores!');
      }

    } );

  }
}
