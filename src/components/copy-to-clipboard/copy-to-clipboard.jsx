import { useState, useCallback } from 'react';

import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

import { ComponentBlock, ComponentContainer } from '../compoenet-block/component-block';

// ----------------------------------------------------------------------

export function CopyToClipboard({ LinkUrl, title }) {
  const { copy } = useCopyToClipboard();

  // const [value, setValue] = useState(LinkUrl);

  const textOnClick = `Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
  Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat
  dolor lectus quis orci. Cras non dolor.
  `;

  const onCopy = useCallback(
    (text) => {
      if (text) {
        toast.success('Copied!');
        copy(text);
      }
    },
    [copy]
  );

  return (
    <ComponentContainer>
      <ComponentBlock title={title}>
        <Typography
          variant="body2"
          // onClick={handleClick}
          style={{ cursor: 'pointer' }}
          color="text.primary"
          sx={{
            cursor: 'pointer',
            color: 'text.primary',
            wordBreak: 'break-all', // Allows the link to break at any point if it overflows
            whiteSpace: 'normal', // Ensures the text can wrap to the next line
          }}
        >
          <Link href={LinkUrl} target="_blank" rel="noopener noreferrer">
            {LinkUrl}
          </Link>
          <InputAdornment position="start" style={{ display: 'inline-flex' }}>
            <Tooltip title="Copy">
              <IconButton onClick={() => onCopy(LinkUrl)}>
                <Iconify icon="eva:copy-fill" width={24} />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        </Typography>
      </ComponentBlock>
    </ComponentContainer>
  );
}
