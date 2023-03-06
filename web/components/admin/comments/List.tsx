import {
  Datagrid,
  EmailField,
  List,
  ReferenceField,
  TextField,
} from 'react-admin';

export const CommentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="postId" reference="posts" />
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="body" />
    </Datagrid>
  </List>
);
