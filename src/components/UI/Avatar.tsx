type AvatarProps = {
  url: string;
  alt: string;
  size?: string | number;
};

export default function Avatar({ url, alt, size = 80 }: AvatarProps) {
  return (
    <img
      src={url}
      alt={alt}
      className="aspect-square object-cover border-2 border-black rounded-full"
      style={{ height: size }}
    />
  );
}
