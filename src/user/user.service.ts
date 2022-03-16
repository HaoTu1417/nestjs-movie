import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Hasher } from './Utility/PasswordHasher';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser); //INSERT
  }

  findAll(): Promise<User[]> {
    // return this.usersRepository.find({ relations: ['pets'] }); //SELECT * from user JOIN pets
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    try {
      const user = this.usersRepository.findOneOrFail(id); //SELECT * from user WHERE user.id = id;
      return user;
    } catch (err) {
      throw err;
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        userName: loginUserDto.username,
      }); //SELECT * from user WHERE user.id = id;
      if (!user) {
        return null;
      }

      const isMatch = this.isMatch(loginUserDto.password, user.password);
      if (isMatch) {
        return user;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    user.name = UpdateUserDto.name;
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return user;
  }

  getHashedString = async (password: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  };
  isMatch = async (plainTextPassword: string, hash: string) => {
    const result = await bcrypt.compare(plainTextPassword, hash);
    return result;
  };
}
