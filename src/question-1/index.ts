import { UserInput } from './models/input';
import { IUser } from './models/output';

export function mapUserInputToDomainModel(input: UserInput): IUser {
  // TODO: Implement and replace the return object
  return {
    id: 'john@example.com',
    name: 'John Doe',
    phoneNumber: '1234567890',
    emailAddress: 'john@example.com',
    dateOfBirth: new Date(1990, 1, 1),
    ageToday: 32,
  };
}
