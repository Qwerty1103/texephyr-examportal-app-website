import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from 'react-router-dom';
import UserLogout from "../../User/UserLogout"

const drawerWidth = 200;

export default function PermanentDrawerLeft() {
	const menuItems = [
		{ text: 'Home', path: '/' },
		{ text: 'Score Board', path: '/round/u/scoreboard' },
		{ text: 'Sign Out', onClick: UserLogout },
	  ];
	
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: `calc(100% - ${drawerWidth}px)`,
					ml: `${drawerWidth}px`,
					color: "black"
				}}
			></AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box"
					}
				}}
				variant="permanent"
				anchor="left"
			>
				<Divider />
				<List>
      				{menuItems.map((item) => (
      			  <ListItem key={item.text} disablePadding>
          			<ListItemButton onClick={item.onClick} component={Link} to={item.path} >
           			 	<ListItemText primary={item.text} />
          			</ListItemButton>
       			 </ListItem>
     			 ))}
   			    </List>
				<Divider />
			</Drawer>
		</Box>
	);
}
