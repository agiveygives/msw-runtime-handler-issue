import axios from 'axios';

const fetcher = <T>(url: string): Promise<T> => (
  axios
    .get<T>(
      url,
      {
        headers: {
          'cache-control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      },
    )
    .then((response) => response.data)
);

export default fetcher;
