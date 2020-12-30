import { useEffect } from 'react';
import Store from '../store';

const usePage = fields => {
  useEffect(() => {
    Store.update(s => {
      s.currentPage = fields;
    });
  }, [fields]);
};

export default usePage;
