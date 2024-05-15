import { Component, EventEmitter, Inject, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autor } from '../../../models/autor';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AutoresService } from '../../../services/autores.service';

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

  autorService = inject(AutoresService);


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

  save(){
    if(this.autor.id > 0){
      this.autorService.update(this.autor).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/autores'], { state: { autorNovo: this.autor } });
          this.retorno.emit(this.autor);
    
        },
        error: erro => {

          alert(erro.status);
          console.log(erro);
         
          Swal.fire({
            title: 'Erro ao alterar',
            icon: 'error',
            confirmButtonText: 'Ok'
          });

        }
      } );
    }
    else{
      this.autorService.save(this.autor).subscribe({
        next: retorno=> {
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/autores'],{state: {autorNovo: this.autor}});
          this.retorno.emit(this.autor);
        },
        error: erro=> {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }

      })
    }
  }

}
