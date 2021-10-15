import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeUserTokensRepository = new FakeUserTokensRepository();

    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password using the email ', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Wick',
      email: 'johnwick@dog.com',
      password: 'protetordosanimais',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johnwick@dog.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover password using an email nonexistent ', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'johnwick@dog.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Wick',
      email: 'johnwick@dog.com',
      password: 'protetordosanimais',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johnwick@dog.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
