import axios from 'axios';
import { ApiResponse } from '../models/ApiResponse';
import { RegisterPayload } from '../models/payload/RegisterPayload';
import { User } from '../models/User';

export class UsersService {
  public async register(
    payload: RegisterPayload,
  ): Promise<ApiResponse<boolean>> {
    const res = await axios.post<ApiResponse<boolean>>(
      '/api/auth/register',
      payload,
    );
    return res.data;
  }

  public async get(id: string): Promise<ApiResponse<User>> {
    console.log(id);
    const res = await axios.get<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
    );
    return res.data;
  }
}
