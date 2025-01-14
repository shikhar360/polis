import React from "react";
import Image from "next/image";
import { H2, Text } from "./Text";
import Link from "next/link";

interface AppCardProps {
  data: IApplication;
}

const AppCard: React.FC<AppCardProps> = ({
  data: { id, title, screenshots, description },
}) => {
  return (
    <div className="flex flex-col justify-between max-w-sm p-4 transition duration-200 border border-white shadow-md bg-gradient-to-b from-slate-100 to-transparent w-fit rounded-2xl transform-gpu hover:shadow-lg hover:scale-105">
      <Link href={`/application/${id}`}>
        <div className="flex justify-end">
          <div className="w-12 h-12">
            <Image
              src={screenshots[0]}
              alt={title}
              width={48}
              height={48}
              className="rounded-lg shadow-md"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="px-4 py-2 text-left">
          <H2 className="mb-2 text-xl font-bold md:text-2xl lg:text-2xl">
            {title}
          </H2>
          <Text className="text-sm md:text-base lg:text-base">
            {description}
          </Text>
        </div>
      </Link>
    </div>
  );
};

export default AppCard;
