import { Postagem } from "./Postagem";

export class User{ //olhe o swagger para completar a model
  public id: number; //Note que os atributos estão sublinhados de vermelho para retirar isso, vá em tsconfig.json e adicione após a linha 08 ("strict"), "StrictPropertyInitialization":false. Isto significa que os atributos não precisam ser inicializados
  public nome: string;
  public usuario: string;
  public senha: string;
  public foto: string;
  public tipo: string;
  public postagem:Postagem[];// 1 usuário para várias postagens, por isso a necessidade do array
}