import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from '@mui/material';
import { useRecordContext } from 'react-admin';

interface Props {
  source: string;
}

const MyUrlField = ({ source }: Props) => {
  const record = useRecordContext();
  return record ? (
    <Link href={record[source]} sx={{ textDecoration: 'none' }}>
      {record[source]}
      <LaunchIcon sx={{ fontSize: 15, ml: 1 }} />
    </Link>
  ) : null;
};

export default MyUrlField;
