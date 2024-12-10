import { PetProfileType } from "@/types/petProfile";
import { calculateAge } from "@/utils/format/calculateAge";

function ProfileTitle({ details }: { details: PetProfileType }) {
  const birthday = new Date(details.birth_date);
  const age = calculateAge(birthday);
  return (
    <h2 className="text-main-5 text-[18px] flex gap-1 items-center">
      {details.pet_list.name}
      <div className="text-main-3 text-[14px]">
        <span>{age} / </span>
        <span>{details.gender}</span>
      </div>
    </h2>
  );
}
export default ProfileTitle;
