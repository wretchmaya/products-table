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
        <Toolbar>
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
                        <Button className={CLASSES.ADD_PRODUCT_BUTTON}>
                            <Link href={ROUTES.ADD_PRODUCT}>{TEXT.ADD_NEW_PRODUCT}</Link>
                        </Button>
                    </Tooltip>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={searchPlaceHolder}
                        value={searchValue}
                        onChange={onSearch}
                    />
                </>
            )}
        </Toolbar>
    );
};
