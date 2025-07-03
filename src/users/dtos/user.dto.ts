import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  /**
   * @description Esta propiedad debe ser el email del usuario
   * @example bartolomiau@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @description Esta propiedad debe ser el nombre del usuario
   * @example Bartolomiau
   */
  @IsString()
  @MinLength(3)
  name: string;

  /**
   * @example Barto123!
   */
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/,
    {
      message:
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número, un carácter especial (!@#$%^&*) y tener entre 8 y 15 caracteres.',
    },
  )
  password: string;

  confirmPassword: string;

  /**
   * @example Calle71
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * @example 151244867
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * @example Colombia
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * @example Medellin
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginDTO extends PickType(CreateUserDTO, ['password', 'email']) {}
