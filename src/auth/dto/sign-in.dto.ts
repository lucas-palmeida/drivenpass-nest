import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: "lucas@email.com",
        description: "email for user"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "S3nh@3xce1ente!",
        description: "password for user"
    })
    password: string;
}
