import { Create, SimpleForm, TextInput } from 'react-admin';

export const UserCreate = () => (
  <Create>
    <SimpleForm sx={{ width: 300 }}>
      <TextInput source="name" fullWidth />
      <TextInput source="username" fullWidth />
      <TextInput source="email" fullWidth />
      <TextInput source="address.street" fullWidth />
      <TextInput source="phone" fullWidth />
      <TextInput source="website" fullWidth />
      <TextInput source="company.name" fullWidth />
    </SimpleForm>
  </Create>
);
