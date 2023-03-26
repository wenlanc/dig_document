import React from 'react';
import { Box, IconButton, Button } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import styled from 'styled-components';

const LocationButton = styled(IconButton)`
  position: absolute;
  width: 30px;
  height: 30px;
`

export default function ChooseLocation({ onClose, onChange }) {
  const [location, setLocation] = React.useState('');

  const handleButtonClick = (evt) => {
    const location = evt.currentTarget.name;
    setLocation(location);
    onChange(location);
  }

  const embedLocationStyles = {
    'top center': { top: 'auto', left: 'calc(50% - 25px)' },
    'center center': { top: 'calc(50% - 40px)', left: 'calc(50% - 25px)' },
    'bottom center': { bottom: '1em', left: 'calc(50% - 25px)' },
    'top left': { top: 'auto', left: 'auto' },
    'center left': { top: 'calc(50% - 40px)', left: 'auto' },
    'bottom left': { bottom: '1em', left: 'auto' },
    'top right': { top: '1em', right: '2.5em' },
    'center right': { top: 'calc(50% - 40px)', right: '2.5em' },
    'bottom right': { bottom: '1em', right: '2.5em' },
  }

	return (
		<Box sx={{ pb: 2 }}>
      <Box sx={{ height: '300px', backgroundColor: 'gray', p: 2, position: 'relative', mb: 2 }}>
        <Box sx={{ 
              width: '50px',
              height: '80px',
              backgroundColor: '#fff',
              border: '1px solid black',
              position: 'absolute',
              ...embedLocationStyles[location],
            }}></Box>
      
              <LocationButton
                sx={{ top: '40px', left: 'calc(50% - 15px)'}}
                color="primary"
                name='top center'
                title='top center'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
          <LocationButton 
                sx={{ top: 'calc(50% - 15px)', left: 'calc(50% - 15px)'}}
                color="primary"
                name='center center'
                title='center center'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
      
              <LocationButton
                sx={{ bottom: '40px', left: 'calc(50% - 15px)'}}
                color="primary"
                name='bottom center'
                title='bottom center'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
      
              <LocationButton
                sx={{ top: '40px', left: '25px'}}
                color="primary"
                name='top left'
                title='top left'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
      
              <LocationButton
                sx={{ top: 'calc(50% - 15px)', left: '25px'}}
                color="primary"
                name='center left'
                title='center left'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
      
              <LocationButton
                sx={{ bottom: '40px', left: '25px'}}
                color="primary"
                name='bottom left'
                title='bottom left'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
      
              <LocationButton
                sx={{ right: '50px', top: '40px'}}
                color="primary"
                name='top right'
                title='top right'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
              <LocationButton
      
                sx={{ right: '50px', top: 'calc(50% - 15px)'}}
                color="primary"
                name='center right'
                title='center right'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
      
              <LocationButton
                sx={{ right: '50px', bottom: '40px'}}
                color="primary"
                name='bottom right'
                title='bottom right'
                onClick={handleButtonClick}>
                <AdjustIcon />
              </LocationButton>
      </Box>

      <Button sx={{ display: 'block', ml: 'auto', mr: 2 }} variant='contained' onClick={onClose}>OK</Button>
    </Box>
	);
}