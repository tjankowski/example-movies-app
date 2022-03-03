import { BiPlay } from "react-icons/bi";

const MovieTrailer = ({ movie }) => {
  return (
    <div className="relative flex justify-center items-center cursor-pointer">
      <div className="overflow-hidden ">
        <img
          alt={`Trailer ${movie.title}`}
          className="rounded-md transition-all brightness-50 hover:brightness-75"
          src={`https://api.lorem.space/image/movie?w=1536&h=600&hash=${movie.id}`}
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center">
        <BiPlay className="text-white" size="3em" />
        <span className="text-white text-sm">Watch trailer</span>
      </div>
    </div>
  );
};

export default MovieTrailer;
