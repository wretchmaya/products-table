import React, { ChangeEvent, useEffect, useState } from 'react';
import { fetchProductsRequest } from '@/store/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectProducts, selectLoadingStatus } from '@/store/rootReducer';
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    styled,
    tableCellClasses,
} from '@mui/material';
import { CircularProgress } from '@mui/joy';
import Image from 'mui-image';
import { EnhancedTableToolbar } from './TableToolBar/EnhancedTableToolBar';
import { EnhancedTableHead, Order } from './TableHead/EnhancedTableHead';
import { getComparator, stableSort } from './helpers/sortingActions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const EnhencedTable = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(selectProducts);
    const isLoading = useAppSelector(selectLoadingStatus);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, []);

    useEffect(() => {
        setSelected([]);
    }, [products]);

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const filteredRows = products.filter(product => {
        return Object.values(product).some(value =>
            ('' + value).toLowerCase().includes(searchValue)
        );
    });

    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = products.map(product => product.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    return (
        <>
            {isLoading ? (
                <CircularProgress
                    size="lg"
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '48%',
                    }}
                />
            ) : (
                <TableContainer component={Paper}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        selectedId={selected}
                        searchValue={searchValue}
                        onSearch={handleSearch}
                    />
                    <Table>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                            {stableSort(filteredRows, getComparator(order, orderBy)).map(
                                (row: any) => {
                                    const isItemSelected = isSelected(row.id);
                                    return (
                                        <StyledTableRow
                                            key={row.id}
                                            onClick={() => handleClick(row.id)}
                                        >
                                            <StyledTableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </StyledTableCell>
                                            {Object.keys(row).map(
                                                (value: any, index: number) => {
                                                    if (value === 'image') {
                                                        return (
                                                            <StyledTableCell key={index}>
                                                                <Image
                                                                    height="125px"
                                                                    width="145px"
                                                                    fit="contain"
                                                                    src={row.image}
                                                                    showLoading={true}
                                                                    errorIcon={true}
                                                                    alt={row.title}
                                                                />
                                                            </StyledTableCell>
                                                        );
                                                    }
                                                    return (
                                                        <StyledTableCell key={index}>
                                                            {row[value]}
                                                        </StyledTableCell>
                                                    );
                                                }
                                            )}
                                        </StyledTableRow>
                                    );
                                }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};
