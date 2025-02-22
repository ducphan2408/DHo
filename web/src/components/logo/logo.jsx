import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import LogoDHO from '../../../public/assets/splash.png'

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  const logo = (
    <Box
      component="img"
      src={LogoDHO}
      sx={{ width: 150, height: 150, cursor: 'pointer', ...sx }}
    />
  );


  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/dashboard" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
