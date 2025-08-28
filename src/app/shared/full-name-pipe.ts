import { Pipe, PipeTransform } from '@angular/core';


// Convierte "Nombre Apellido" -> "Sr. Apellido, Nombre"
@Pipe({ name: 'fullName', standalone: true })
export class FullNamePipe implements PipeTransform {
    transform(name: string | null | undefined, honorifico: string = 'Sr.'): string {
        if (!name) return '';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return `${honorifico}. ${parts[0]}`;
        const last = parts.pop();
        const first = parts.join(' ');
        return `${honorifico}. ${last}, ${first}`;
    }
}