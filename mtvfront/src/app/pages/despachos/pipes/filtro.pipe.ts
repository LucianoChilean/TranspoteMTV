import { Pipe, PipeTransform } from '@angular/core';
import { Despacho } from 'src/app/interfaces/despacho.interafece';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(despachos: Despacho[],page: number=0,buscar:string = ''): Despacho[] {

      if(buscar.length ===0)
      return despachos.slice(page,page +5);

      const despachosFiltrados = despachos.filter( despacho => despacho.descripcion.includes(buscar));

    return despachosFiltrados.slice(page, page +5);
  }

}
