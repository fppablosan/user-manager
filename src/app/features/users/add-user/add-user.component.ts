import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import { UserService } from '../../../core/user.service';


@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [FormsModule],
    template: `
<h2>Crear nuevo usuario</h2>


<form (ngSubmit)="submit()" class="form">
<label>Nombre completo
<input [(ngModel)]="name" name="name" placeholder="Nombre y apellidos" required />
</label>


<label>Email
<input [(ngModel)]="email" name="email" type="email" required />
</label>


<button type="submit" class="btn">Crear</button>
</form>
`,
    styles: [`
.form { display:grid; gap:.75rem; max-width:480px; }
input { width:100%; padding:.55rem .7rem; border:1px solid #e5e7eb; border-radius:.5rem; }
.btn { width:max-content; background:#16a34a; color:#fff; border:none; padding:.55rem .9rem; border-radius:.5rem; cursor:pointer; }
`]
})
export class AddUserComponent {
    private svc = inject(UserService);
    private router = inject(Router);
    private notify = inject(NotificationService);


    name = '';
    email = '';


    submit() {
        if (!this.name || !this.email) return;
        this.svc.addUser({ name: this.name, email: this.email }).subscribe(u => {
            this.notify.show(`Usuario creado: ${u.name}`);
            this.router.navigate(['/users']);
        });
    }
}