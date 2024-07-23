import axios from 'axios';
import {
  GetAllUsersProps,
  GetSingleUserProps,
  UserProps,
} from './APIService.types';

export const getAllUsers = async () => {
  const res = await axios.get('https://reqres.in/api/users?page=1');
  const data: GetAllUsersProps = res.data;
  return data;
};

export const getSingleUser = async (id: string) => {
  const res = await axios.get(`https://reqres.in/api/users/${id}`);
  console.log('res', res.data);
  const data: GetSingleUserProps = res.data;
  return data;
};
