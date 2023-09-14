import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';

function NavList({setSelectedHall})
{
    const [halls, setHalls] = useState(['loading...']);

    useEffect(() => {
        fetch('http://localhost:5000/halls')
        .then(data => data.json())
        .then(hallsList => setHalls(hallsList.halls))
        .catch((err) => console.log(err));
    }, []);

    return (
        <>
        <Toolbar />
        <Divider />
        <List>
        {halls.map((text) => (
            <>
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setSelectedHall(text)}>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            <Divider />
            </>
            ))}
        </List>
        </>
    );
}

export default NavList;

