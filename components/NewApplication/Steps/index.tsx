import { FC, useState } from "react";
import cn from "classnames";
import { Tab } from "@headlessui/react";
import {
  ChevronDoubleRightIcon,
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/20/solid";
import BasicInfo from "./BasicInfo";
import ExternalLinks from "./ExternalLinks";
import { stepKeys, Steps, StepsData } from "../types";

import Preview from "./Preview";
import Button from "../../Button";

const NewApplicationSteps: FC = () => {
  const TOTAL_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<StepsData>({
    basicInfo: {
      title: "",
      category: [""],
      description: "",
    },
    externalLinks: {
      applicationUrl: "",
      repoUrl: "",
    },
    preview: {
      screenshots: [""],
    },
  });

  const [steps] = useState<Steps>({
    basicInfo: {
      id: 1,
      title: "Basic Info",
      component: BasicInfo,
    },
    externalLinks: {
      id: 2,
      title: "External Links",
      component: ExternalLinks,
    },
    preview: {
      id: 3,
      title: "Preview",
      component: Preview,
    },
  });

  const handleUpdateData = (data: StepsData) => {
    // TODO handle data once decide on the storage solution
  };

  const moveToNext = () => {
    if (currentStep === TOTAL_STEPS - 1) return;
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const moveToPrev = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  return (
    <Tab.Group selectedIndex={currentStep} as="div" className="px-2">
      <Tab.List className="flex pt-6 ">
        {Object.keys(steps).map((step, index) => (
          <Tab key={step}>
            {({ selected }) => (
              <div
                className={cn(
                  "flex items-center font-semibold ",
                  selected ? "text-[#202328]" : "text-gray-500"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center text-xs flex-shrink-0 w-5 h-5 mr-2 border rounded-full",
                    selected ? "border-[#202328]" : "border-gray-500"
                  )}
                >
                  <span>{steps[step as stepKeys].id}</span>
                </span>
                <span>{steps[step as stepKeys].title}</span>
                {index < Object.keys(steps).length - 1 && (
                  <ChevronDoubleRightIcon className="w-4 h-4 mx-4 text-gray-400" />
                )}
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="relative h-[450px]">
        <h2 className="text-[#202328] mt-8 text-2xl font-medium">
          Submit New Application
        </h2>
        <Tab.Panel>
          <BasicInfo
            data={formData.basicInfo}
            handleUpdateData={(data) => console.log(data)}
          />
        </Tab.Panel>
        <Tab.Panel>
          <ExternalLinks
            data={formData.externalLinks}
            handleUpdateData={(data) => console.log(data)}
          />
        </Tab.Panel>
        <Tab.Panel>
          <Preview
            data={formData.preview}
            handleUpdateData={(data) => console.log(data)}
          />
        </Tab.Panel>
        <div className="absolute bottom-0 right-0 flex">
          <button onClick={moveToPrev} className="mr-12">
            <div className="flex items-center text-xs">
              <ArrowLeftCircleIcon className="w-6 h-6 mr-1" />
              Previous Step
            </div>
          </button>
          {currentStep === TOTAL_STEPS - 1 ? (
            <Button className="px-2 text-xs" onClick={moveToNext}>
              <ArrowRightCircleIcon className="w-6 h-6" />
              Submit New Application
            </Button>
          ) : (
            <Button className="text-xs" onClick={moveToNext}>
              <ArrowRightCircleIcon className="w-6 h-6" />
              Next Step
            </Button>
          )}
        </div>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default NewApplicationSteps;
