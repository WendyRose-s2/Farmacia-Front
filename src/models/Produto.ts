import Tema from './Tipo';
import Usuario from './Usuario';

export default interface Produto {
  id: number;
  titulo: string;
  texto: string;
  tipo: tipo | null;
  
}