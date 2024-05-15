import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { FormsModule, NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { state } from '@angular/animations';
import Swal from 'sweetalert2'
import { LivrosService } from '../../../services/livros.service';


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

  livroService = inject(LivrosService);


  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0 ){
      this.findById(id);
    }
  }

  findById(id : number){
    this.livroService.findById(id).subscribe({
      next: livro => {
        this.livro = livro;
      },
      error: erro => {
        alert(erro.status);
        console.log(erro);
        Swal.fire({
          title: 'Deu algum erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } );
  }

  save(){
    if(this.livro.id > 0){
      this.livroService.update(this.livro).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/livros'], { state: { livroNovo: this.livro } });
          this.retorno.emit(this.livro);
    
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

      this.livroService.save(this.livro).subscribe({
        next: retorno=> {
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/livros'],{state: {livroNovo: this.livro}});
          this.retorno.emit(this.livro);
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
