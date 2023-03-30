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
import { TEXT, CLASSES, searchPlaceHolder } from './constants';
import { ROUTES } from '@/constants/routes';

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
        <Toolbar className={CLASSES.TOOLBAR}>
            {numSelected > 0 ? (
                <Typography>
                    {numSelected} {TEXT.SELECTED}
                </Typography>
            ) : (
                <Typography variant="h6">{TEXT.PRODUCTS}</Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title={TEXT.DELETE}>
                    <IconButton
                        onClick={() => dispatch(deleteProductRequest(selectedId))}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <Tooltip title={TEXT.ADD_NEW_PRODUCT}>
                        <Button
                            sx={{ margin: '0 15px 0 auto' }}
                            className={CLASSES.ADD_PRODUCT_BUTTON}
                            variant="outlined"
                            color="inherit"
                        >
                            <Link href={ROUTES.ADD_PRODUCT}>{TEXT.ADD_NEW_PRODUCT}</Link>
                        </Button>
                    </Tooltip>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={searchPlaceHolder}
                        value={searchValue}
                        onChange={onSearch}
                        className={CLASSES.SEARCH}
                    />
                </>
            )}
        </Toolbar>
    );
};
