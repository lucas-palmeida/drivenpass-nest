import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Computer",
        description: "title for note"
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Turn off the computer when starts raining.",
        description: "content for note"
    })
    content: string;
}