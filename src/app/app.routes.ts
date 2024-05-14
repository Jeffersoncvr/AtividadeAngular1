import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LivroslistComponent } from './components/livros/livroslist/livroslist.component';
import { LivrosdetailsComponent } from './components/livros/livrosdetails/livrosdetails.component';
import { EditorasdetailsComponent } from './components/editoras/editorasdetails/editorasdetails.component';
import { EditoraslistComponent } from './components/editoras/editoraslist/editoraslist.component';
import { AutoreslistComponent } from './components/autores/autoreslist/autoreslist.component';
import { AutoresdetailsComponent } from './components/autores/autoresdetails/autoresdetails.component';

export const routes: Routes = [
    {path: "", redirectTo: "login" , pathMatch: 'full' },
    {path: "login" , component :LoginComponent },
    {path: "admin", component : PrincipalComponent, children: [

        {path : "livros", component : LivroslistComponent},
        {path : "livros/novo", component : LivrosdetailsComponent},
        {path : "livros/editar/:id", component : LivrosdetailsComponent},

        {path : "editoras", component : EditoraslistComponent},
        {path : "editoras/novo", component : EditorasdetailsComponent},
        {path : "editoras/editar/:id", component : EditorasdetailsComponent},

        {path : "autores", component : AutoreslistComponent},
        {path : "autores/novo", component : AutoresdetailsComponent},
        {path : "autores/editar/:id", component : AutoresdetailsComponent}
    ]}
];
