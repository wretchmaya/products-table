import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from '@mui/material';
import { ChangeEvent } from 'react';
import { image, headCells } from './constants';

export type Order = 'asc' | 'desc';
interface EnhancedTableHeadProps {
    onRequestSort: (property: string) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
}

export const EnhancedTableHead = ({
    order,
    orderBy,
    onRequestSort,
    onSelectAllClick,
}: EnhancedTableHeadProps): JSX.Element => {
    const createSortHandler = (property: string) => onRequestSort(property);

    const generateHeadCells = () => {
        return headCells.map(headCell => {
            if (headCell.id === image) {
                return <TableCell key={headCell.id}>{headCell.label}</TableCell>;
            }
            return (
                <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={() => createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                    </TableSortLabel>
                </TableCell>
            );
        });
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox color="primary" onChange={onSelectAllClick} />
                </TableCell>
                {generateHeadCells()}
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
};
