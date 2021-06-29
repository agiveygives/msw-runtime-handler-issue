import React, { ReactNode, FC } from 'react';
import { AxiosError } from 'axios';
import { SWRConfig } from 'swr';

interface Props {
  children: ReactNode;
}

const TestWrapper: FC<Props> = ({ children }: Props) => (
  <SWRConfig
    value={{
      dedupingInterval: 0,
      onError: (error: AxiosError) => {
        console.error(error.message);
      },
    }}
  >
    {children}
  </SWRConfig>
)

export default TestWrapper;
