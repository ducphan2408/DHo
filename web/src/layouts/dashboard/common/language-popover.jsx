import { useState } from 'react';

import { Box, Stack, Popover, MenuItem, IconButton  } from '@mui/material';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'vn',
    label: 'Tiếng Việt',
    icon: '/assets/icons/ic_flag_vn.svg',
  },
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
];

let selectedLanguage = LANGS[0].value;
let selectedIcon = LANGS[0].icon;

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleLanguageSelect = (language) => {
    selectedLanguage = language.value;
    selectedIcon = language.icon;
    // i18n.changeLanguage(language.value);
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img src={selectedIcon} alt={LANGS[0].label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === selectedLanguage}
              onClick={() => handleLanguageSelect(option)}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}