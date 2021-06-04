import { v4 as uuid } from 'uuid';
import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      updated_at: new Date(),
      created_at: new Date(),
    });

    this.users.unshift(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.id === id);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser === user);

    this.users[userIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
