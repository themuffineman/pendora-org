const FeatureCard = ({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src: string;
}) => {
  return (
    <div className=" relative flex flex-col gap-3 items-center p-4 pb-0 rounded-md border hover:border-[#c9c9c9] w-[20rem] ">
      <h4 className="font-semibold text-lg w-max">{title}</h4>
      <h5 className="px-10 text-sm font-light text-center ">{description}</h5>
      <img className="aspect-auto w-[400px] " src={src} alt="Feature Image" />
    </div>
  );
};
export default FeatureCard;
