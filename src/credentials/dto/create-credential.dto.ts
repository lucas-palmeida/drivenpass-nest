import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

/*
- Para registrar uma nova credencial, o usuário deverá fornecer uma url, um nome de usuário e uma senha. O usuário também precisa informar um título/nome/rótulo
 para essa credencial, uma vez que é possível cadastrar duas credenciais para um mesmo site.  Caso nenhum dos dados seja enviado, retorne `400 Bad Request`.
- Cada credencial deve possuir um título/nome/rótulo único, ou seja, se o usuário tentar criar duas credenciais com o mesmo nome, a aplicação deve impedi-lo
 (o que não impede que outras pessoas usem esse título) `409 Conflict`.
- Por ser um dado sensível, o campo de senha da credencial deve ser criptografado usando um segredo da aplicação. Use a biblioteca [cryptr]
(https://www.npmjs.com/package/cryptr) para isso.
*/