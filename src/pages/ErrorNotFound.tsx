import {Link} from 'react-router-dom';

export function ErrorNotFound(): JSX.Element {
  return (
    <div className='errorPage'>
      <div>
        <h1>404 Not Found</h1>
      </div>

      <Link to="/">Back on Main</Link>
    </div>
  );
}
