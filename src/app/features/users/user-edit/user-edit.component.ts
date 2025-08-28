import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/user.service';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-user-edit',
    standalone: true,
    imports: [FormsModule],
    template: `
<div class="edit">
<h3>Editar usuario (demo)</h3>
@if (loading) {
<p>Cargando...</p>
} @else if (name) {
<form (ngSubmit)="save()">
<label>Nombre
<input [(ngModel)]="name" name="name" />
</label>
<label>Email
<input [(ngModel)]="email" name="email" />
</label>
<button type="submit" class="btn">Guardar (simulado)</button>
</form>
}
</div>
`,
    styles: [`
.edit { margin-top: 1rem; padding:1rem; border:1px dashed #cbd5e1; border-radius:.6rem; }
form { display:grid; gap:.6rem; max-width:420px; }
input { width:100%; padding:.5rem .6rem; border:1px solid #e5e7eb; border-radius:.4rem; }
.btn { background:#0ea5e9; color:#fff; padding:.45rem .7rem; border:none; border-radius:.4rem; cursor:pointer; }
`]
})
export class UserEditComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private svc = inject(UserService);


    loading = true;
    name = '';
    email = '';


    ngOnInit(): void {
        const id = Number(this.route.parent?.snapshot.paramMap.get('id') ?? this.route.snapshot.paramMap.get('id'));
        this.svc.getUser(id).subscribe(u => {
            this.name = u.name;
            this.email = u.email;
            this.loading = false;
        });
    }


    save() {
        alert('Guardado local (simulación).');
    }
}