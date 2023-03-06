import {
  Create,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        label="User"
        source="userId"
        reference="users"
        validate={[required()]}
      >
        <SelectInput sx={{ width: 300 }} optionText="name" />
      </ReferenceInput>
      <TextInput source="title" fullWidth sx={{ width: 700 }} />
      <TextInput source="body" multiline rows={5} sx={{ width: 700 }} />
    </SimpleForm>
  </Create>
);
