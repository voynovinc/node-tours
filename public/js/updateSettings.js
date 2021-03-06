/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// Type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.01:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.01:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
    console.log(res.data);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
