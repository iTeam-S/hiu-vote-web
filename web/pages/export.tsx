import { Box, Button, Grid, Stack } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import { NextPageWithLayout } from './page';

const dataExport = {
  received: 20,
  send: 40,
  outgoing: 50,
  spam: 10,
  doublon: 15,
  rejet: 5,
};

const ExportExcel: NextPageWithLayout = () => {
  const handleExport = async () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    const font = {
      name: 'Comic Sans MS',
      family: 4,
      size: 10,
      //underline: true,
      bold: true,
    };

    worksheet.getCell('A1').font = font;
    worksheet.getCell('B1').font = font;
    worksheet.getCell('C1').font = font;
    //customCell.value = 'Custom header here';
    // Add some data to the worksheet
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'Phone', key: 'phone', width: 20 },
    ];

    worksheet.addRow({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-555-5555',
    });
    worksheet.addRow({
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-555-5555',
    });

    // Save the workbook
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'myFile.xlsx');
  };
  return (
    <section>
      <h2>Layout Export Excel</h2>
      <Stack spacing={2} direction="row" display="block">
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleExport()}
        >
          Exporter
        </Button>
        <Grid container my={4} rowSpacing={2} columnSpacing={4}>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="secondary.light" p={2}>
              Received
            </Box>
            <Box bgcolor="primary.light" p={2}>
              {dataExport.received}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="secondary.light" p={2}>
              Send
            </Box>
            <Box bgcolor="primary.light" p={2}>
              {dataExport.send}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="secondary.light" p={2}>
              Outgoing
            </Box>
            <Box bgcolor="primary.light" p={2}>
              {dataExport.outgoing}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="secondary.light" p={2}>
              Spam
            </Box>
            <Box bgcolor="primary.light" p={2}>
              {dataExport.spam}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="secondary.light" p={2}>
              Doublons
            </Box>
            <Box bgcolor="primary.light" p={2}>
              {dataExport.doublon}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor="secondary.light" p={2}>
              Rejets
            </Box>
            <Box bgcolor="primary.light" p={2}>
              {dataExport.rejet}
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </section>
  );
};

export default ExportExcel;

ExportExcel.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  );
};
