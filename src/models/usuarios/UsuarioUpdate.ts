import { Pessoa } from "./Pessoa.ts";
import { Empresa } from "./Empresa.ts";
import { UsuarioType } from "./enums/UsuarioType.ts";

interface UsuarioUpdate {
  type: UsuarioType;
  uuid: string
  apelido: string;
}

interface PessoaUpdate extends UsuarioUpdate {
  nome: string;
  sobrenome: string;
  pronomes?: string;
}

interface EmpresaUpdate extends UsuarioUpdate {
  cnpj: string;
}

function isPessoaUpdate(usuarioUpdate: UsuarioUpdate):
    usuarioUpdate is PessoaUpdate {
  return usuarioUpdate.type === UsuarioType.PESSOA;
}

function isEmpresaUpdate(usuarioUpdate: UsuarioUpdate):
  usuarioUpdate is EmpresaUpdate {
  return usuarioUpdate.type === UsuarioType.EMPRESA;
}

function fromPessoa(pessoa: Pessoa): PessoaUpdate {
  return {
    type: pessoa.type,
    uuid: pessoa.uuid,
    apelido: pessoa.apelido,
    nome: pessoa.nome,
    sobrenome: pessoa.sobrenome,
    pronomes: pessoa.pronomes,
  };
}

function fromEmpresa(empresa: Empresa): EmpresaUpdate {
  return {
    type: empresa.type,
    uuid: empresa.uuid,
    apelido: empresa.apelido,
    cnpj: empresa.cnpj,
  };
}

export type { UsuarioUpdate, EmpresaUpdate, PessoaUpdate };
export { fromPessoa, fromEmpresa, isPessoaUpdate, isEmpresaUpdate };
