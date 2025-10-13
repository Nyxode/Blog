type Props = {
  name: string;
  picture?: string;
};

export default function Avatar({ name, picture }: Props) {
  return (
    <div className="flex items-center">
      {picture && (
        <img
          src={picture}
          className="w-12 h-12 rounded-full mr-4"
          alt={name}
        />
      )}
      <div className="text-lg font-medium">{name}</div>
    </div>
  );
}
