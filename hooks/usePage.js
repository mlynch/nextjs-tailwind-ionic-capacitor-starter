import { useEffect } from 'react';
import Store from '../store';

const usePage = (fields, deps) => {
  useEffect(() => {
    console.log('Deps updating', fields, deps);
    Store.update(s => {
      s.currentPage = fields;
    });
  }, [fields, deps]);
};

export default usePage;
