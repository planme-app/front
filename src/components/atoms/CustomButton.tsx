import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';

interface CustomButtonProps {
  type: 'startStop' | 'resetDelete' | 'moveLeft' | 'moveRight' | 'setting';
  children?: string;
  display?: string;
  borderRadius?: string;
  backgroundColor?: string;
  mt?: number;
  px?: number;
  height?: string;
  color?: string;
  src?: string;
  width?: number;
  imageHeight?: number;
  alt?: string;
}

export function CustomButton({
  type,
  children,
  display,
  borderRadius,
  backgroundColor,
  mt,
  px,
  height,
  src,
  width,
  imageHeight,
  alt,
  color,
  ...rest
}: CustomButtonProps) {
  return (
    <Box
      display={display}
      borderRadius={borderRadius}
      sx={{ backgroundColor, mt, px, height }}
    >
      <Button size="small" sx={{ color }} {...rest}>
        {(type === 'moveLeft' || type === 'moveRight') && src && alt ? (
          <Image src={src} width={width} height={imageHeight} alt={alt} />
        ) : (
          children
        )}
      </Button>
    </Box>
  );
}
