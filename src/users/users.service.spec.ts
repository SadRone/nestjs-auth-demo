import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken }  from '@nestjs/typeorm';
import { Repository }          from 'typeorm';

import { UsersService }        from './users.service';
import { User }                from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          // Mock the TypeORM repository that UsersService injects
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create:  jest.fn(),
            save:    jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo    = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByEmail calls repository.findOne', async () => {
    const fakeUser = { id: '123', email: 'a@b.com' };
    (repo.findOne as jest.Mock).mockResolvedValue(fakeUser);

    const user = await service.findByEmail('a@b.com');
    expect(repo.findOne).toHaveBeenCalledWith({ where: { email: 'a@b.com' } });
    expect(user).toEqual(fakeUser);
  });

  it('create calls repository.create and save', async () => {
    const dto = { email: 'x@y.com', username: 'x', password: 'p' };
    (repo.create as jest.Mock).mockReturnValue(dto);
    (repo.save as jest.Mock).mockResolvedValue({ ...dto, id: 'abc' });

    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ ...dto, id: 'abc' });
  });
});
