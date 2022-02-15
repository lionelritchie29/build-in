import { User } from './User';

export type Session = {
  data: {
    expires: string;
    user: User;
  };
};
