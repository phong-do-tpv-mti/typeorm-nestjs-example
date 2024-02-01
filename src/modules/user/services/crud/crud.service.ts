import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  async create() {
    const user = new User();
    user.firstName = 'Phong - ' + Date.now();
    user.lastName = 'Do - ' + Date.now();
    user.isActive = true;
    await this.usersRepository.insert(user);

    const profile = new Profile();
    profile.email = `phong-${Date.now()}@gmail.com`;
    profile.phone = Date.now().toString();
    profile.address = 'HCM City';
    profile.user = user;
    return await this.profilesRepository.insert(profile);
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        profile: true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profile: {
          address: true,
        },
      },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
