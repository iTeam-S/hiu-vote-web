import { useMediaQuery } from '@mui/material';
import {
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  SimpleList,
  TextField,
  TextInput,
} from 'react-admin';

const postFilters = [
  <TextInput source="q" label="Search" key="post" alwaysOn />,
  <ReferenceInput
    source="userId"
    label="User"
    key="postUser"
    reference="users"
  />,
];

export const PostList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List filters={postFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.id}
          secondaryText={(record) => record.title}
          tertiaryText={() => (
            <ReferenceField source="userId" reference="users" />
          )}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <ReferenceField source="userId" reference="users" />
          <TextField source="title" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};
