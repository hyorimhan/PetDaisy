import Image from "next/image";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProfileImageProps {
  images: string[];
}
function ProfileImage({ images }: ProfileImageProps) {
  return (
    <div className="shrink-0 w-[100px] h-[122px]">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation={false}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "active",
        }}
      >
        {images.map((imageUrl: string, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-[100px] h-[122px]">
              <Image
                src={imageUrl}
                alt="pet-profile"
                fill
                className="rounded-lg object-cover aspect-[3/4]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProfileImage;
