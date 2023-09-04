import { ApiProperty } from "@nestjs/swagger";
import { CardType } from "@prisma/client";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Roxinho",
        description: "title for card"
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "12345678910",
        description: "number for card"
    })
    number: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "lucas da silva",
        description: "holder name for card"
    })
    holder: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "123",
        description: "cvv for card"
    })
    cvv: string;

    @IsNumber()
    @Min(1)
    @Max(12)
    @IsNotEmpty()
    @ApiProperty({
        example: 5,
        description: "expiration month for card"
    })
    expiryMonth: number;

    @IsNumber()
    @Min(23)
    @IsNotEmpty()
    @ApiProperty({
        example: 28,
        description: "expiration year for card"
    })
    expiryYear: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "123456",
        description: "password for card"
    })
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        example: true,
        description: "true or false if is a virtual card"
    })
    isVirtual: boolean;

    @IsEnum(['CREDIT', 'DEBIT', 'CREDIT_DEBIT'],{ message: 'Card type must be one of CREDIT, DEBIT, CREDIT_DEBIT'})
    @IsNotEmpty()
    @ApiProperty({
        example: "CREDIT",
        description: "card type for card. Valid values are CREDIT, DEBIT or CREDIT_DEBIT"
    })
    cardType: CardType;
}
