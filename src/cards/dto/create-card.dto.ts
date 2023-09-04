import { CardType } from "@prisma/client";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    number: string;

    @IsString()
    @IsNotEmpty()
    holder: string;

    @IsString()
    @IsNotEmpty()
    cvv: string;

    @IsNumber()
    @Min(1)
    @Max(12)
    @IsNotEmpty()
    expiryMonth: number;

    @IsNumber()
    @Min(23)
    @IsNotEmpty()
    expiryYear: number;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isVirtual: boolean;

    @IsEnum(['CREDIT', 'DEBIT', 'CREDIT_DEBIT'],{ message: 'Card type must be one of CREDIT, DEBIT, CREDIT_DEBIT'})
    @IsNotEmpty()
    cardType: CardType;
}
