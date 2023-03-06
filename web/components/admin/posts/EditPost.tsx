import {
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from 'react-admin';

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = () => (
  <Edit title={<PostTitle />}>
    <SimpleForm>
      <TextInput source="id" disabled sx={{ width: 300 }} />
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
  </Edit>
);
