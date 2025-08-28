import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../../core/user.service';
import { FullNamePipe } from '../../../shared/full-name-pipe';


@Component({
    selector: 'app-user-detail',
    standalone: true,
    imports: [RouterLink, RouterOutlet, FullNamePipe],
    template: `
@if (loading) {
  <p>Cargando...</p>
} @else if (user) {
  <section class="detail">
    <img [src]="user.avatar" [alt]="user.name" />
    <div>
      <h2>{{ user.name | fullName:'Sr' }}</h2>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Website:</strong> {{ user.website || '—' }}</p>
      <div class="links">
        <a [routerLink]="['/users']">← Volver</a>
        <a [routerLink]="['/users', user.id, 'edit']" class="btn">Editar (ruta hija)</a>
      </div>
    </div>
  </section>
  <router-outlet />
} @else {
  <p>No se encontró el usuario.</p>
}
`,
    styles: [`
.detail { display:flex; gap:1rem; align-items:flex-start; }
img { width: 104px; height:104px; border-radius:50%; object-fit:cover; }
.links { display:flex; gap:.75rem; margin-top:.5rem; }
.btn { background:#0ea5e9; color:#fff; padding:.4rem .7rem; border-radius:.4rem; text-decoration:none; }
`]
})
export class UserDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private svc = inject(UserService);


    user: any;
    loading = true;


    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.svc.getUser(id).subscribe(u => {
            this.user = u;
            this.loading = false;
        });
    }
}