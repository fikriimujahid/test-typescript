export interface UserInput {
  name: string | null | undefined;
  phoneNumber: string | null | undefined;
  emailAddress: string | null | undefined;
  dateOfBirth: string | null | undefined;
}

export function ageToday(payload: UserInput) {
  let timeDiff = Math.abs(Date.now() - new Date(payload.dateOfBirth!).getTime());
  let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  return age;
}

export function setIdInput(payload: UserInput) {
  if(payload.emailAddress && (payload.phoneNumber || !payload.phoneNumber)){
    return payload.emailAddress;
  } else if(payload.phoneNumber && !payload.emailAddress){
    return payload.phoneNumber;
  }

  return '';
}