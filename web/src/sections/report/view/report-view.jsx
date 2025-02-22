import { useState } from 'react';

import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { reports } from 'src/_mock/report';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator, applyFilterVerified } from '../utils';

// ----------------------------------------------------------------------

export default function ReportPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [filterVerified, setFilterVerified] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = reports.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: reports,
    comparator: getComparator(order, orderBy),
    filterName,
    filterVerified,
  });

  const handleFilterByVerified = (event, value) => {
    setPage(0);
    setFilterVerified(value);
  };

  const dataFilteredVerified = applyFilterVerified({
    inputData: reports,
    comparator: getComparator(order, orderBy),
    filterVerified,
    filterName,
  });

  const notFound = (!dataFiltered.length && !!filterName) || (!dataFilteredVerified.length && !!filterVerified);

  console.log(filterVerified.length)

  return (
    <Container>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterVerified={filterVerified}
          onFilterVerified={handleFilterByVerified}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={reports.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'post_id', label: 'ID'},
                  { id: 'name', label: 'Sản phẩm' },
                  { id: 'date', label: 'Ngày báo cáo' },
                  { id: 'reason', label: 'Lý do báo cáo' },
                  { id: 'verified', label: 'Trạng thái' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {(filterVerified.length === 0 ? dataFiltered : dataFilteredVerified)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.post_id}
                      post_id={row.post_id}
                      verified={row.verified}
                      seller_name={row.seller_name}
                      phone_number={row.phone_number}
                      email={row.email}
                      street={row.street}
                      ward={row.ward}
                      district={row.district}
                      province={row.province}
                      name={row.name}
                      price={row.price}
                      case_size={row.case_size}
                      status={row.status}
                      date={row.date}
                      count={row.count}
                      date_ago={row.date_ago}
                      formatted_price={row.formatted_price}
                      case_size_num={row.case_size_num}
                      description={row.description}
                      brand={row.brand}
                      strap_material={row.strap_material}
                      battery_life={row.battery_life}
                      waterproof={row.waterproof}
                      waterproof_num ={row.waterproof_num}
                      gender={row.gender}
                      seller_id={row.seller_id}
                      media={row.media}
                      reason={row.reason}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, reports.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={(filterVerified.length === 0 ? dataFiltered.length : dataFilteredVerified.length)}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Số hàng:'
        />
      </Card>

    </Container>
  );
}
