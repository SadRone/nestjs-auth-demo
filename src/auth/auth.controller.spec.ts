import { Test, TestingModule } from '@nestjs/testing';
import { AuthController }      from './auth.controller';
import { AuthService }         from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login:    jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calls AuthService.register when register() is invoked', async () => {
    const dto = {
      email: 'a@b.com',
      username: 'tester',
      password: 'pw',
      confirmPassword: 'pw',
    };
    await controller.register(dto as any);
    const authService = moduleRef.get<AuthService>(AuthService) as any;
    expect(authService.register).toHaveBeenCalledWith(
      dto.email,
      dto.username,
      dto.password,
    );
  });

  it('calls AuthService.login when login() is invoked', async () => {
    const dto = { email: 'a@b.com', password: 'pw' };
    await controller.login(dto as any);
    const authService = moduleRef.get<AuthService>(AuthService) as any;
    expect(authService.login).toHaveBeenCalledWith(dto.email, dto.password);
  });
});
