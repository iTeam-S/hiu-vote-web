import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource } from 'react-admin';
import { CommentList } from './comments/List';
import { Dashboard } from './Dashboard';
import { PostCreate } from './posts/CreatePost';
import { PostEdit } from './posts/EditPost';
import { PostList } from './posts/ListPost';
import { UserCreate } from './users/CreateUser';
import { UserEdit } from './users/EditUser';
import { UserList } from './users/ListUser';
import { authProvider } from './utils/authProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="users"
      list={UserList}
      recordRepresentation="name"
      edit={UserEdit}
      create={UserCreate}
      icon={UserIcon}
    />
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource name="comments" list={CommentList} />
  </Admin>
);

export default App;
