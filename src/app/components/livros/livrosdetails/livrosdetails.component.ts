import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { FormsModule, NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { state } from '@angular/animations';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss'
})
export class LivrosdetailsComponent {

  
 @Input("livro") livro : Livro = new Livro(0,'');
 @Output("retorno") retorno = new EventEmitter<any>();
  router  = inject(ActivatedRoute);
  router2= inject(Router)

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0 ){
      this.findById(id);
    }
  }

  findById(id : number){
    let livroRetornado : Livro = new Livro(id, 'Alterado');
    this.livro = livroRetornado;
  }

  salvar(){
    if(this.livro.id > 0){
      Swal.fire({
        title: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/livros'],{state: {livroEditado: this.livro}});
    }
    else{
      Swal.fire({
        title: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/livros'],{state: {livroNovo: this.livro}});
    }
    
    this.retorno.emit(this.livro);
  }
}
