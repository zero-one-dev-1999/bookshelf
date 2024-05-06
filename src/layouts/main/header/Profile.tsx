import { Avatar, IconButton, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import useSelector from 'hooks/use-selector';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { authLogoutAction } from 'store/actions';
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'

const Profile: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const theme = useTheme()
	const open = Boolean(anchorEl)

	const { user } = useSelector(s => ({
		user: s.Auth.user,
	}))

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
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
                <Avatar sx={{ cursor: 'pointer' }}>
                    <Typography fontWeight={600} textTransform='uppercase' color={theme.palette.primary.dark}>
                        {user?.name?.[0]}
                    </Typography>
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
                    <MenuItem onClick={handleClose} sx={{ fontSize: '14px' }}>
                        <IconButton sx={{ marginLeft: '-4px' }}>
                            <PersonIcon />
                        </IconButton>
                        {user.name}
                    </MenuItem>
                    <MenuItem
                        sx={{ fontSize: '14px' }}
                        onClick={() => {
                            dispatch(authLogoutAction())
                        }}
                    >
                        <IconButton>
                            <LogoutIcon />
                        </IconButton>
                        {t('logout')}
                    </MenuItem>
                </Menu>
            </Stack>
        </Stack>
    );
};

export default Profile