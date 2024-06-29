import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { RoleTableRow } from '../role-table-row';
import { RoleTableToolbar } from '../role-table-toolbar';
import { RoleTableFiltersResult } from '../role-table-filters-result';
import axios, { endpoints } from 'src/utils/axios';
import { jwtDecode } from 'src/auth/context/jwt';
// ----------------------------------------------------------------------
const ROLE_STATUS_OPTIONS = [
  { value: true, label: 'Active' },
  { value: false, label: 'InActive' },
];

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...ROLE_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'role_name', label: 'Role Name' },
  { id: 'createdBy', label: 'Created by' },
  { id: 'role_status', label: 'Role Status' },
  { id: 'updatedBy', label: 'Last Updated by' },
  { id: '', label: 'Actions' },
];

const defaultFilters = {
  keyword: '',
  status: 'all',
};

// ----------------------------------------------------------------------

export function RoleListView() {
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState([]);
  const [TotalCount, setTotalCount] = useState({ all: 0, active: 0, inactive: 0 });

  const filters = useSetState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!filters.state.keyword || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleUpdateStatus = useCallback(
    async (row) => {
      let Payload = {
        role_id: row._id,
        status: row.role_status === true ? false : true,
        user_id: jwtDecode(sessionStorage.getItem('jwt_access_token')).id,
      };
      await axios
        .post(endpoints.roles.status_update, Payload)
        .then((response) => {
          toast.success(response.data.message);
          table.onUpdatePageDeleteRow(dataInPage.length);
          fetchAllRoles('update');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      console.log(id, 'handleEditRow ID');
      router.push(paths.dashboard.roles.edit(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      const updatedValue = newValue === 'true' ? true : newValue === 'false' ? false : newValue;
      table.onResetPage();
      filters.setState({ status: updatedValue });
    },
    [filters, table]
  );

  useEffect(() => {
    fetchAllRoles();
  }, [filters, table.page, table.rowsPerPage]);

  async function fetchAllRoles(type) {
    try {
      const response = await axios.get(endpoints.roles.list, {
        params: {
          page: type == 'update' ? table.page : table.page + 1,
          limit: table.rowsPerPage,
          keyword: filters.state.keyword,
          status: filters.state.status,
        },
      });
      console.log(response, 'response');
      setTableData(response.data.data);
      setTotalCount(response.data.totalCounts);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Roles', href: paths.dashboard.roles.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.roles.createRole}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Role
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={String(filters.state.status)}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={String(tab.value)}
                iconPosition="end"
                value={String(tab.value)}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' ||
                        String(tab.value) === String(filters.state.status)) &&
                        'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === true && 'success') ||
                      (tab.value === false && 'error') ||
                      'default'
                    }
                  >
                    {tab.value === 'all'
                      ? TotalCount.all
                      : tab.value === true
                        ? TotalCount.active
                        : TotalCount.inactive}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <RoleTableToolbar filters={filters} onResetPage={table.onResetPage} />

          {canReset && (
            <RoleTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <RoleTableRow
                        key={row._id}
                        row={row}
                        selected={table.selected.includes(row._id)}
                        onSelectRow={() => table.onSelectRow(row._id)}
                        onUpdateStatusRow={() => handleUpdateStatus(row)}
                        onEditRow={() => handleEditRow(row._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { keyword, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (keyword) {
    inputData = inputData.filter(
      (role) => role.role_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    );
  }
  if (status !== 'all') {
    inputData = inputData.filter((role) => role.role_status === status);
  }

  return inputData;
}
