import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  const mockedResult = {
    id: 1,
    text: 'foo',
    created: '2022-09-13T14:54:12.849Z',
  };
  const mockedResultUpdated = {
    id: 1,
    text: 'foo updated',
    created: '2022-09-13T14:54:12.849Z',
  };

  const mockPrisma = {
    todo: {
      findMany: () => Promise.resolve([mockedResult]),
      findUnique: () => Promise.resolve(mockedResult),
      create: () => Promise.resolve(mockedResult),
      delete: () => Promise.resolve(mockedResult),
      update: () => Promise.resolve(mockedResultUpdated),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<TodoService>(TodoService);
  });

  test('find all', async () => {
    const { data: findAll } = await service.findAll();
    expect(JSON.stringify(findAll)).toBe(JSON.stringify([mockedResult]));
  });

  test('find one', async () => {
    const { data: findOne } = await service.findOne(1);
    expect(findOne).toBe(mockedResult);
  });

  test('create', async () => {
    const { data: create } = await service.create(mockedResult);
    expect(create).toBe(mockedResult);
  });

  test('update', async () => {
    const { data: update } = await service.update(1, mockedResultUpdated);
    expect(update).toBe(mockedResultUpdated);
  });

  test('delete', async () => {
    const { data: deleted } = await service.remove(1);
    expect(deleted).toBe(mockedResult);
  });
});
