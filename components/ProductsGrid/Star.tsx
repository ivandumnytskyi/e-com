type Props = {
  rating: number;
};

function Star({ rating }: Props) {
  const stars = rating - (rating % 1);
  const halfstar = rating % 1 > 0.5;
  return (
    <span className="h-6 flex items-center justify-between">
      <div className="flex">
        {Array.from({ length: stars }, (_, index) => {
        return <img src="/star.svg" alt="star" key={index} className="h-6" />;
      })}
      {halfstar && (
        <span className="h-6 w-3 overflow-hidden">
          <img src="/star.svg" alt="star" className="h-6 w-6 max-w-none" />
        </span>
      )}
      </div>
      <div className="ml-2">({rating.toFixed(1)})</div>
    </span>
  );
}

export default Star;
