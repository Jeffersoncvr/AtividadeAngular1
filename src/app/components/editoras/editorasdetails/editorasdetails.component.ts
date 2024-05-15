import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Editora } from '../../../models/editora';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { EditoraService } from '../../../services/editora.service';

@Component({
  selector: 'app-editorasdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editorasdetails.component.html',
  styleUrl: './editorasdetails.component.scss'
})
export class EditorasdetailsComponent {

  @Input("editora") editora : Editora = new Editora(0,'');
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2= inject(Router)

  editoraService = inject(EditoraService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0 ){
      this.findById(id);
    }
  }

  findById(id : number){
    let editoraRetornada : Editora = new Editora(id, 'Alterado');
    this.editora = editoraRetornada;
  }

  save(){
    if(this.editora.id > 0){
      this.editoraService.update(this.editora).subscribe({
        next: retorno => {

          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/editoras'], { state: { editoraNovo: this.editora } });
          this.retorno.emit(this.editora);
    
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
      this.editoraService.save(this.editora).subscribe({
        next: retorno=> {
          Swal.fire({
            title: 'Salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/editoras'],{state: {editoraNovo: this.editora}});
          this.retorno.emit(this.editora);
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
