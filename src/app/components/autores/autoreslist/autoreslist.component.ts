import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Autor } from '../../../models/autor';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { LivrosdetailsComponent } from '../../livros/livrosdetails/livrosdetails.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AutoresdetailsComponent } from '../autoresdetails/autoresdetails.component';

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

  
  constructor(){
    
    this.lista.push(new Autor(1, 'Stephen King'));
    this.lista.push(new Autor(2, 'H.P Lovecraft'));
    this.lista.push(new Autor(3, 'Jk Rowling'));
    this.lista.push(new Autor(4, 'Joe Hill'));


    let autorNovo = history.state.autorNovo;
    let autorEditado = history.state.autorEditado;

    if(autorNovo){
      autorNovo.id=123;
      this.lista.push(autorNovo);

    }

    if(autorEditado){
      let indice = this.lista.findIndex(x => {return x.id ==  autorEditado.id});
      this.lista[indice] = autorEditado;
    }
    
  }

  deletar(autor : Autor){

    Swal.fire({
      title: 'Tem certeza eu deseja deletar este autor?!',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      denyButtonText: "Nao!",

    }).then((result) => {
      if (result.isConfirmed) {
          let indice = this.lista.findIndex(x => {return x.id == autor.id});
          this.lista.splice(indice, 1 );        
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
    this.modalRef.close();

    if(autor.id>0){
      let indice = this.lista.findIndex(x => {return x.id == autor.id});
      this.lista[indice] = autor;
    }else{
      autor.id = 123;
      this.lista.push(autor);
    }
  }
}
