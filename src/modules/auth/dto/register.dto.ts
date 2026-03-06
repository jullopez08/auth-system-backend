import { IsEmail, IsString, MinLength, Matches } from "class-validator";
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
     { message: 
    'la contraseña debe de contener una letra mayuscula, una minuscula y un numero' })
  password: string;

  @IsString()
  name: string;
}