import { BiCaretUp, BiCaretDown, BiChevronRight } from "react-icons/bi";

const userName = (userId) => userId.substr(0, 5);
const MovieCard = ({ movie }) => {
  const { id, title, like_count, dislike_count, user_id } = movie;
  return (
    <article className="flex rounded-md overflow-hidden h-[200px] bg-white transition-shadow shadow-lg border border-gray-100 p-4 hover:shadow-xl">
      <img
        alt={title}
        className="rounded-md"
        src={`https://api.lorem.space/image/movie?w=100&h=150&hash=${id}`}
      />
      <div className="flex justify-between flex-grow flex-col p-4 overflow-hidden">
        <div>
          <h1 className="text-xl">{title}</h1>
          <p className="text-sm text-gray-600">Added by {userName(user_id)}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4 text-teal-600">
            <div className="flex items-center space-x-2">
              <BiCaretUp />
              <span>{like_count}</span>
            </div>
            <div className="flex items-center text-rose-600 space-x-2">
              <span>{dislike_count}</span>
              <BiCaretDown />
            </div>
          </div>
          <BiChevronRight
            className="text-rose-800 bg-rose-100 rounded"
            size={"2rem"}
          />
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
