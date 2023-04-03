import React, { ChangeEvent, useEffect, useState } from 'react';
import { fetchProductsRequest } from '@/store/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectProducts, selectLoadingStatus, Product } from '@/store/rootReducer';
import {
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Button,
} from '@mui/material';
import { CircularProgress } from '@mui/joy';
import Image from 'mui-image';
import { EnhancedTableToolbar } from './TableToolBar/EnhancedTableToolBar';
import { EnhancedTableHead, Order } from './TableHead/EnhancedTableHead';
import { getComparator, stableSort } from './helpers/sortingActions';
import { CLASSES, TABLECELL_VALUES, TEXT } from './constants';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';

export const EnhencedTable = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const router = useRouter();
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
    }, [isLoading]);

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

    const handleViewDetails = (id: number) => {
        router.push(`${ROUTES.PRODUCT_DETAILS}${id}`);
    };

    const generateTableRowValues = (row: Product) => {
        return Object.keys(row).map((value: string, index: number) => {
            const key = value as keyof Product;
            if (value === TABLECELL_VALUES.IMAGE) {
                return (
                    <TableCell key={index}>
                        <Image
                            src={row.image || ''}
                            showLoading={true}
                            errorIcon={true}
                            alt={row.title}
                            className={CLASSES.PRODUCT_IMAGE}
                        />
                    </TableCell>
                );
            }
            return (
                <TableCell key={index} className={`${key}`}>
                    {row[key]}
                </TableCell>
            );
        });
    };

    return (
        <>
            {isLoading ? (
                <CircularProgress className={CLASSES.SPINNER} size="lg" />
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
                                (row: Product) => {
                                    const isItemSelected = isSelected(row.id);
                                    return (
                                        <TableRow
                                            key={row.id}
                                            onClick={() => handleClick(row.id)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>

                                            {generateTableRowValues(row)}

                                            <TableCell>
                                                <Button
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        handleViewDetails(row.id);
                                                    }}
                                                    className={
                                                        CLASSES.PRODUCT_DETAILS_BUTTON
                                                    }
                                                >
                                                    {TEXT.PRODUCT_DETAILS}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
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
