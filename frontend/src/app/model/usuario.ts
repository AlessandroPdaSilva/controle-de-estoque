import { Profissao } from './profissao';
import { Telefone } from './telefone';

export class Usuario {

	id!: Number;
	login!: String;
	nome!: String;
	senha!: String;
	dataNascimento!: String;

	profissao!: Profissao;

	listaTelefone!: Array<Telefone>;
}
