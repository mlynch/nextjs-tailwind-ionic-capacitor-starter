import { useEffect, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Link = ({ children, href, router, ...props }) => {
  const [local, setLocal] = useState(false);

  useEffect(() => {
    setLocal(true);
  }, []);

  console.log('Rendering link', local, router);

  if (!local || router === false) {
    return children;
  }
  // return <a {...props}>{children}</a>;
  return (
    <ReactRouterLink to={href} {...props}>
      {children}
    </ReactRouterLink>
  );
};

export default Link;
