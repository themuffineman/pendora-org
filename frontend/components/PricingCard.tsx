type CardProps = {
  planName: string;
  price: string;
  features: string[];
};

const PricingCard = ({ planName, price, features }: CardProps) => {
  return (
    <div className="w-[20rem] flex flex-col items-center gap-10 p-3 py-20 border hover:border-[#c9c9c9] rounded-md">
      <div className="text-4xl font-bold tracking-tighter">{planName}</div>
      <div className="flex items-end">
        <div className="text-3xl font-bold ">${price}</div>
        <div className="text-sm font-light">per/mo</div>
      </div>
      <button className="rounded-md w-[100%] p-2 px-4 flex items-center justify-center bg-[#E4F222] text-light text-sm text-black/75 tracking-tighter">
        Start your 30 day free trial
      </button>
      <div className="w-full flex flex-col items-start gap-4 ">
        <div className="text-xl font-bold ">Features:</div>
        <ul className="flex flex-col gap-2 items-start">
          {features.map((string) => (
            <li className="flex gap-2 items-center text-sm font-light ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
              {string}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
