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
  type?: PageType;
  children?: string | React.ReactNode;
  display?: string;
  justifyContent?: string;
  alignContent?: string;
  borderRadius?: number | string;
  position?: Position;
  backgroundColor?: string;
  mt?: number | string;
  m?: number | string;
  mx?: number | string;
  p?: number | string;
  px?: number | string;
  height?: string;
  width?: string;
  bottom?: string;
  color?: string;
  src?: string;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CustomButton({
  type,
  children,
  display,
  justifyContent,
  alignContent,
  borderRadius,
  backgroundColor,
  m,
  mt,
  mx,
  p,
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
  disabled,
  onClick,
  ...rest
}: CustomButtonProps) {
  return (
    <Box
      display={display}
      justifyContent={justifyContent}
      alignContent={alignContent}
      borderRadius={borderRadius}
      position={position}
      sx={{
        backgroundColor,
        mt,
        p,
        px,
        height,
        width,
        bottom,
        m,
        mx
      }}
    >
      <Button
        size="small"
        onClick={onClick}
        sx={{ color }}
        {...rest}
        disabled={disabled}
      >
        {src && alt ? (
          <Image src={src} width={imageWidth} height={imageHeight} alt={alt} />
        ) : (
          children
        )}
      </Button>
    </Box>
  );
}
