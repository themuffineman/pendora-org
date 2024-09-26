const FeatureCard = ({
  title,
  description,
  src,
  comingSoon,
}: {
  title: string;
  description: string;
  src: string;
  comingSoon?: boolean;
}) => {
  return (
    <div className=" relative flex flex-col gap-3 items-center p-4 pb-0 rounded-md border hover:border-[#c9c9c9] w-[20rem] h-[27rem] ">
      <h4 className="font-semibold text-lg w-max">{title}</h4>
      <h5 className="px-10 text-sm font-light text-center ">{description}</h5>
      <img className="aspect-auto w-[300px] " src={src} alt="Feature Image" />
      {comingSoon && (
        <div className="p-1 px-4 absolute rounded-lg bottom-2 right-2 bg-yellow-200 text-sm">
          Coming Soon
        </div>
      )}
    </div>
  );
};
export default FeatureCard;
