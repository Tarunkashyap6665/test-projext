"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function PricingCard({
  userPlan,
  plans,
}: {
  userPlan?: boolean;
  plans: PlanProp;
}) {
  const router=useRouter()
  return (
    <div className="grid lg:grid-flow-col gap-8 justify-center">
      {plans.map((plan,key) => (
        <Card
          variant="gradient"
          className="w-full max-w-[20rem] p-8 bg-gradient-to-r from-purple-900 to-indigo-900 text-white overflow-hidden"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          key={key}
        >
          <div className="absolute bg-black inset-0 opacity-30"></div>
          <div className="z-10">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                variant="small"
                color="white"
                className="font-normal uppercase"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {plan.name}
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <span className="mt-2 text-4xl">$</span>
                {plan.price} <span className="self-end text-4xl">/mo</span>
              </Typography>
            </CardHeader>
            <CardBody
              className="p-0"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ul className="flex flex-col gap-4">
                {plan.inclusions.map((item,key) => (
                  <li className="flex items-center gap-4" key={key}>
                    <span className="rounded-full border border-white/20 bg-white/20 p-1">
                      {item.isIncluded ? (
                        <CheckIcon />
                      ) : (
                        <Cross1Icon className="h-3 w-3" />
                      )}
                    </span>
                    <Typography
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {item.label}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardBody>
            <CardFooter
              className="mt-12 p-0"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {plan.isAvailable ? (
                <Button
                  size="lg"
                  color="white"
                  className={`hover:scale-[1.02] focus:scale-[1.02] active:scale-100`}
                  ripple={false}
                  fullWidth={true}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  disabled={userPlan}
                  onClick={()=>{router.push("/sign-in")}}
                >
                  {userPlan ? "Current Plan" : "Get Started"}
                </Button>
              ) : (
                <Button
                  size="lg"
                  color="white"
                  ripple={false}
                  fullWidth={true}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  disabled
                >
                  Coming Soon ...
                </Button>
              )}
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}
