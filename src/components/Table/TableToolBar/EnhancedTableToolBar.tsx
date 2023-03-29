import {
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
    Button,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { deleteProductRequest } from '@/store/api';

interface EnhancedTableToolbarProps {
    numSelected: number;
    selectedId: number[];
    searchValue: string;
    onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EnhancedTableToolbar = ({
    numSelected,
    selectedId,
    searchValue,
    onSearch,
}: EnhancedTableToolbarProps): JSX.Element => {
    const dispatch = useAppDispatch();
    return (
        <Toolbar>
            {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography variant="h6" id="tableTitle" component="div">
                    Products
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton
                        onClick={() => dispatch(deleteProductRequest(selectedId))}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <Tooltip title="Add New Product">
                        <Button sx={{ margin: '0 auto' }}>
                            <Link
                                href="/add-product"
                                style={{ textDecoration: 'none' }}
                            >
                                Add new product
                            </Link>
                        </Button>
                    </Tooltip>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={onSearch}
                    />
                </>
            )}
        </Toolbar>
    );
};
