import { CanActivateFn } from '@angular/router';


// Guard "de juguete" para el bonus: pregunta si quieres entrar en /add-user
export const authGuard: CanActivateFn = () => {
    return window.confirm('Esta ruta está protegida (demo). ¿Deseas continuar?');
};