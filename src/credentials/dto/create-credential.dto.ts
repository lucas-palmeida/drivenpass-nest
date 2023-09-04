import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Tweetero",
        description: "title for credential"
    })
    title: string;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({
        example: "https://tweetero.com.br/sign-in",
        description: "url for credential"
    })
    url: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "suquin-de-murucuja",
        description: "username for credential"
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "3ss@Senh4eHB0a",
        description: "password for credential"
    })
    password: string;
}