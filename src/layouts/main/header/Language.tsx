import { Avatar, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import uzbek from '../../../../public/uzbek.png'
import english from '../../../../public/english.png'

const Language: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { t } = useTranslation()
    const open = Boolean(anchorEl)

    const currentLanguage = i18n.language;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const changeLang = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    return (
        <Stack>
            <IconButton
                onClick={handleClick}
                size='small'
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar src={currentLanguage === 'uz' ? uzbek : english} sx={{ cursor: 'pointer' }}>
                </Avatar>
            </IconButton>
            <Stack spacing={3} direction='row' alignItems='center'>
                <Menu
                    anchorEl={anchorEl}
                    id='account-menu'
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem
                        sx={{ fontSize: '14px' }}
                        onClick={() => changeLang('uz')}
                    >
                        {t('uzbek')}
                    </MenuItem>
                    <MenuItem
                        sx={{ fontSize: '14px' }}
                        onClick={() => changeLang('en')}
                    >
                        {t('english')}
                    </MenuItem>
                </Menu>
            </Stack>
        </Stack>
    );
};

export default Language