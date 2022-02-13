import axios from 'axios';
import { ApiResponse } from '../models/ApiResponse';
import { RegisterPayload } from '../models/payload/RegisterPayload';

export class AuthService {
  public async register(
    payload: RegisterPayload,
  ): Promise<ApiResponse<boolean>> {
    const res = await axios.post<ApiResponse<boolean>>(
      '/api/auth/register',
      payload,
    );
    return res.data;
  }
}
