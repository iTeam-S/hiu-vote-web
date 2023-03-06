import { useMediaQuery } from '@mui/material';
import {
  Datagrid,
  EditButton,
  EmailField,
  List,
  SimpleList,
  TextField,
  TextInput,
} from 'react-admin';
import MyUrlField from '../utils/MyUrlField';

const userFilters = [
  <TextInput source="q" label="Search" key="user" alwaysOn />,
];

export const UserList = () => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List filters={userFilters}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="address.street" />
          <MyUrlField source="website" />
          <TextField source="company.name" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};
