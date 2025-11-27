import { CircleCheck } from "lucide-react";
function PricingModal() {
  return (
    <>
      <main>
        <section>
          <div className="bg-[url('./assets/ChoosePlan.png')] text-center flex flex-col justify-center items-center py-7 rounded-2xl space-y-5">
            <h1 className="text-black text-[32px] font-bold">
              Choose Your Plan
            </h1>
            <div className="flex bg-white w-2xs justify-between p-1 rounded">
              <div className="bg-[#105EF5] w-full rounded text-white">
                Monthly
              </div>
              <div className=" w-full rounded black">Yearly</div>
            </div>
          </div>
        </section>
        <section className="flex justify-between px-6 p-5">
          <div className="flex flex-col py-5 px-3 w-2xs items-center space-y-3 rounded shadow-2xl">
            <div className="text-4xl p-3 rounded-full bg-[#E3F5FF]">🤠</div>
            <div>
              <h1 className="text-2xl">Personal</h1>
              <p className="text-[12px]">Perfect for starters</p>
            </div>
            <div>
              <h1 className="text-[32px] font-bold">Free</h1>
              <p className="text-[14px]">member per month</p>
            </div>
            <button className="text-[22px] bg-none border-[#6d7178] text-[#6d7178] border-2 w-full rounded cursor-pointer">
              Current
            </button>
            <div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Detailed post analytics</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Share with 5 teams memebers</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Sync across devices</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Limited automations</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col py-5 px-3 w-2xs items-center space-y-3 rounded shadow-2xl">
            <div className="text-4xl p-3 rounded-full bg-[#E3F5FF]">🎉</div>
            <div>
              <h1 className="text-2xl">Professional</h1>
              <p className="text-[12px]">For users who want to do more</p>
            </div>
            <div>
              <h1 className="text-[32px] font-bold">$18</h1>
              <p className="text-[14px]">member per month</p>
            </div>
            <button className="text-[22px] bg-[#105EF5] text-white w-full rounded cursor-pointer">
              Upgrade
            </button>
            <div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Detailed post analytics</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Share with 50 teams memebers</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Sync across devices</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Unlimited Power-Ups</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Up to 10 social profile</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-2xs py-5 px-3 items-center space-y-3 rounded shadow-2xl">
            <div className="text-4xl p-3 rounded-full bg-[#E3F5FF]">🚀</div>
            <div>
              <h1 className="text-2xl">Enterprise</h1>
              <p className="text-[12px]">Analyze your company </p>
            </div>
            <div>
              <h1 className="text-[32px] font-bold">$29</h1>
              <p className="text-[14px]">member per month</p>
            </div>
            <button className="text-[22px] bg-[#105EF5] text-white  w-full rounded cursor-pointer">
              Upgrade
            </button>
            <div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Detailed post analytics</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Unlimited teams memebers</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Sync across devices</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Unlimited Power-Ups</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Unlimited automations</p>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck width={17} />
                <p className="text-[14px]">Unlimited social profile</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default PricingModal;
