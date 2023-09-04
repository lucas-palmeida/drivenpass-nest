import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: "lucas@email.com",
        description: "email for user"
    })
    email: string;

    @IsStrongPassword()
    @MinLength(10)
    @IsNotEmpty()
    @ApiProperty({
        example: "S3nh@Mu1t0Bo4",
        description: "strong password for user"
    })
    password: string;
}