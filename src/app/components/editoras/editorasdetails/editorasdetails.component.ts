import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Editora } from '../../../models/editora';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

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

  salvar(){
    if(this.editora.id > 0){
      Swal.fire({
        title: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      this.router2.navigate(['admin/editoras'],{state: {editoraEditada: this.editora}})
    }
    else{
      Swal.fire({
        title: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      this.router2.navigate(['admin/editoras'],{state: {editoraNova: this.editora}})
    }
    this.retorno.emit(this.editora);
  }
}
