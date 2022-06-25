import { ageToday, setIdInput, UserInput } from './models/input';
import { IUser } from './models/output';
import moment, { now } from 'moment';
import validator from 'validator';

export function mapUserInputToDomainModel(input: UserInput): IUser {
  // TODO: Implement and replace the return object

  if(validator.isEmpty(input.name!)){
    throw new Error('name empty');
  }

  if(!input.phoneNumber && !input.emailAddress){
    throw new Error();
  }

  if((input.phoneNumber) && !validator.isLength(input.phoneNumber!, {min:10})){
    throw new Error();
  }

  if((input.phoneNumber) && Number.isNaN(Number(input.phoneNumber))){
    throw new Error();
  }

  if((input.emailAddress) && !validator.isEmail(input.emailAddress!)){
    throw new Error();
  }

  if(!input.dateOfBirth || !validator.isISO8601(input.dateOfBirth) || !validator.isAfter(new Date().toDateString(), input.dateOfBirth)){
    throw new Error();
  }

  const returnObject : IUser = {
    id: setIdInput(input),
    name: input.name ?? '',
    phoneNumber: input.phoneNumber ?? null,
    emailAddress: input.emailAddress ?? null,
    dateOfBirth: moment(new Date(input.dateOfBirth ?? new Date()), moment.ISO_8601).subtract(7, 'hours').toDate(),
    ageToday: ageToday(input),
  }

  return returnObject;
}

