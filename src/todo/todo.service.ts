import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = await this.prisma.todo.create({
      data: createTodoDto,
    });

    return { data: newTodo };
  }

  async findAll() {
    const todos = await this.prisma.todo.findMany({});
    return { data: todos };
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id: id } });
    return { data: todo };
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const updated = await this.prisma.todo.update({
      data: updateTodoDto,
      where: { id: id },
    });
    return { data: updated };
  }

  async remove(id: number) {
    const removed = await this.prisma.todo.delete({ where: { id: id } });
    return { data: removed };
  }
}
