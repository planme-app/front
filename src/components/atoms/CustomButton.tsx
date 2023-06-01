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

type PageType =
  | 'startStop'
  | 'resetDelete'
  | 'movePrev'
  | 'moveNext_or_SettingDot'
  | 'setting'
  | 'logout';

interface CustomButtonProps {
  type: PageType;
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CustomButton({
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
  onClick,
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
      <Button size="small" onClick={onClick} sx={{ color }} {...rest}>
        {src && alt ? (
          <Image src={src} width={imageWidth} height={imageHeight} alt={alt} />
        ) : (
          children
        )}
      </Button>
    </Box>
  );
}
