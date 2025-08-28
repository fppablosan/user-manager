import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../core/user.model';


@Pipe({ name: 'userFilter', standalone: true })
export class UserFilterPipe implements PipeTransform {
    transform(users: User[] | null | undefined, term: string): User[] {
        if (!users) return [];
        if (!term) return users;
        const t = term.toLowerCase();
        return users.filter(u =>
            u.name?.toLowerCase().includes(t) ||
            u.email?.toLowerCase().includes(t)
        );
    }
}