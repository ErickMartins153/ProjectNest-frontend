import { ProfileProps } from "./Profile.tsx";
import ProfileInfo from "./components/ProfileInfo.tsx";
import { BsGearFill } from "@react-icons/all-files/bs/BsGearFill";
import { useNavigate } from "react-router-dom";


export default function OwnProfile({ uuid }: ProfileProps) {
  const navigate = useNavigate();

  const goTo = (path: string) => () => navigate(path);

  return (<>
    <div className="p-8 flex flex-col bg-secondary-color h-max">
      <BsGearFill className="ms-auto text-white cursor-pointer"
                  size={"2.4rem"}
                  onClick={goTo("/update-profile")}/>
      <div className="flex flex-col md:flex-row h-full items-center">
        <ProfileInfo/>
      </div>
    </div>
  </>);
}