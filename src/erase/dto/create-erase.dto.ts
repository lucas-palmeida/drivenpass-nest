import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEraseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "S3nh@D0U5u4r1o",
        description: "password for erase user data"
    })
    password: string;
}
