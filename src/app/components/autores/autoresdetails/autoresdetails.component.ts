import { Component, EventEmitter, Inject, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autor } from '../../../models/autor';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-autoresdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './autoresdetails.component.html',
  styleUrl: './autoresdetails.component.scss'
})
export class AutoresdetailsComponent {
  


  @Input("autor") autor : Autor = new Autor(0,'');
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);


  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0 ){
      this.findById(id);
    }
  }

  findById(id : number){
    let autorRetornado : Autor = new Autor(id, 'Alterado');
    this.autor = autorRetornado;
  }

  salvar(){
    if(this.autor.id > 0){
      Swal.fire({
        title: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      this.router2.navigate(['admin/autores'],{state: {autorEditado: this.autor}})
    }
    else{
      Swal.fire({
        title: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      this.router2.navigate(['admin/autores'],{state: {autorNovo: this.autor}})
    }

    this.retorno.emit(this.autor);
  }

}
