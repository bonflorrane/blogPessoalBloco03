import { Postagem } from "./Postagem";

export class Tema{
  public id: number;
  public descricao: string;
  public postagem: Postagem[];// um array de postagem dentro de tema, e por isso é necessário [] - fazendo aquela relação de 1 tema para várias postagens
}