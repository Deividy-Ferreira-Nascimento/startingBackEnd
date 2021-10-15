import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvide from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService'

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvide()

    const updateAvatar = new UpdateUserAvatarService(fakeUsersRepository,fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name:'John Snow',
      email:'joaodasneves@test.com',
      password:'123456'
    })


    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg');
  });


  it('should not be able to update avatar with an user not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvide()

    const updateAvatar = new UpdateUserAvatarService(fakeUsersRepository,fakeStorageProvider);


    await expect(updateAvatar.execute({
      user_id: 'user-non-exist',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvide()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateAvatar = new UpdateUserAvatarService(fakeUsersRepository,fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name:'John Snow',
      email:'joaodasneves@test.com',
      password:'123456'
    })


    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg');
  });


});
