interface IProps {
  src: string;
}

const ImageLinkCell = ({ src }: IProps) => {
  return (
    <a href={src} target="_blank">
      Open Image
    </a>
  );
};

export default ImageLinkCell;
