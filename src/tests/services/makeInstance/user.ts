import UserService from '../../../services/UserService';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';

const fakeUserRepository = new FakeUserRepository();

export const makeUserService = new UserService(fakeUserRepository);
