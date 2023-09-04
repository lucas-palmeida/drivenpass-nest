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