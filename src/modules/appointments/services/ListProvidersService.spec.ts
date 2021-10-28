import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCashProvider from '@shared/container/providers/CacheProvider/fakes/FakeCashProvider';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCashProvider: FakeCashProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCashProvider = new FakeCashProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCashProvider,
    );
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Snow',
      email: 'joaodasneves@test.com',
      password: 'winteriscomming',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Wick',
      email: 'john@test.com',
      password: 'protetordosanimais',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Winchester',
      email: 'johnwichester@snt.com',
      password: 'goosebumps',
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
