import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

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
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
