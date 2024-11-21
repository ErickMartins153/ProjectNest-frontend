type AvatarProps = {
  url: string;
  alt: string;
  size?: number;
};

export default function Avatar({ url, alt, size = 80 }: AvatarProps) {
  return (
    <img
      src={url}
      alt={alt}
      className="object-cover border-2 border-black rounded-full"
      style={{ width: size, height: size }}
    />
  );
}
