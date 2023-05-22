import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
type Position =
  | 'static'
  | 'relative'
  | 'absolute'
  | 'sticky'
  | 'fixed'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset';

interface CustomButtonProps {
  type:
    | 'startStop'
    | 'resetDelete'
    | 'moveLeft'
    | 'moveRight'
    | 'setting'
    | 'logout';
  children?: string;
  display?: string;
  justifyContent?: string;
  borderRadius?: string;
  position?: Position;
  backgroundColor?: string;
  mt?: number;
  px?: number;
  height?: string;
  width?: string;
  bottom?: string;
  color?: string;
  src?: string;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
}

export function CustomButton({
  type,
  children,
  display,
  justifyContent,
  borderRadius,
  backgroundColor,
  mt,
  px,
  height,
  width,
  position,
  bottom,
  src,
  imageWidth,
  imageHeight,
  alt,
  color,
  ...rest
}: CustomButtonProps) {
  return (
    <Box
      display={display}
      justifyContent={justifyContent}
      borderRadius={borderRadius}
      position={position}
      sx={{
        backgroundColor,
        mt,
        px,
        height,
        width,
        bottom
      }}
    >
      <Button size="small" sx={{ color }} {...rest}>
        {src && alt ? (
          <Image src={src} width={imageWidth} height={imageHeight} alt={alt} />
        ) : (
          children
        )}
      </Button>
    </Box>
  );
}
