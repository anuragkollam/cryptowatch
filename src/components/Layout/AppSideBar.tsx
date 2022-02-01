import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { drawerWidth, navLinks } from './constants';
import { closedMixin, openedMixin } from './mixins';
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brand from './Brand';

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  height: '48px !important'
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    color: theme.palette.text.primary,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface Props {
  open: boolean,
  handleDrawerClose: () => void
}

function AppSideBar({ open, handleDrawerClose }: Props) {
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={open}>
        <DrawerHeader>
            { open && <Brand /> }
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navLinks.map(nav => (
            <ListItem button key={nav.text}>
              <ListItemIcon>
                <nav.icon />
              </ListItemIcon>
              <ListItemText primary={nav.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}

export default AppSideBar;
