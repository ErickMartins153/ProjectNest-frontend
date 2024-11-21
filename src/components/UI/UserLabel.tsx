import Avatar from "./Avatar";

// type UserLabelProps = {
//   userId: string;
// };

export default function UserLabel() {
  return (
    <div className="flex flex-row gap-4 my-4">
      <Avatar
        url="https://i.pinimg.com/736x/a8/63/95/a86395b7138d4b0e72ccd1aef82a6e06.jpg"
        alt="Ursão"
      />
      <div className="flex flex-col justify-center">
        <h2>Fulano de Tal</h2>
        <p>@Fulano</p>
      </div>
    </div>
  );
}
