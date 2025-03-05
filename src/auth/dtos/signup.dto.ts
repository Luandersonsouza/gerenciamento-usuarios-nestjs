import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignUpDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, {message: 'Senha deve conter ao menos um número'})
    password: string;
}