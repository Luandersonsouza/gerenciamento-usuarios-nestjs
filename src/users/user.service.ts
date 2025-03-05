import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../auth/schemas/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
  ) {}

  // Listar todos exceto os soft-deleted
  async findAll(): Promise<Usuario[]> {
    return this.userRepository.find({ withDeleted: false });
  }

  // Buscar por ID
  async findOne(id: string): Promise<Usuario> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      withDeleted: false,
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  // Atualizar
  async update(id: string, updateData: UpdateUserDto): Promise<Usuario> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  // Soft Delete
  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  // Restaura usuário soft-deleted
  async restore(id: string): Promise<void> {
    await this.userRepository.restore(id);
  }
}