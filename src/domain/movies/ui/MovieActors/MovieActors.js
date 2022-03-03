import { mockItems } from "utils/utils";

const MovieActors = ({ movie }) => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Actors</h2>
      <div className="md:grid-cols-8 grid grid-cols-3 gap-2">
        {mockItems(6).map((_, index) => (
          <img
            key={index}
            alt={`Actor ${index}`}
            className="rounded-full"
            width="100"
            height="100"
            src={`https://api.lorem.space/image/face?w=100&h=100&hash=${
              movie.id + index
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieActors;
