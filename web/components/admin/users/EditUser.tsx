import { Edit, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const UserTitle = () => {
  const record = useRecordContext();
  return <span>User {record ? `"${record.name}"` : ''}</span>;
};

export const UserEdit = () => (
  <Edit title={<UserTitle />}>
    <SimpleForm sx={{ width: 300 }}>
      <TextInput source="id" disabled fullWidth />
      <TextInput source="name" fullWidth />
      <TextInput source="username" fullWidth />
      <TextInput source="email" fullWidth />
      <TextInput source="address.street" fullWidth />
      <TextInput source="phone" fullWidth />
      <TextInput source="website" fullWidth />
      <TextInput source="company.name" fullWidth />
    </SimpleForm>
  </Edit>
);
