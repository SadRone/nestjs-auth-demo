// src/auth/dto/register.dto.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

// 1) 바로 위에 decorator 함수를 정의
function Match(property: string, validationOptions?: ValidationOptions) {
  return (obj: any, propertyName: string) => {
    registerDecorator({
      name: 'match',
      target: obj.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === (args.object as any)[property];
        },
        defaultMessage(args: ValidationArguments) {
          return `${propertyName} must match ${property}`;
        },
      },
    });
  };
}

export class RegisterDto {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 chars' })
  password: string;

}
