import Card from './ui/Card';
import Image from 'next/image';

const TripCard = ({
  title,
  type = 'Vacation',
  catch_phrase,
  author,
  avatar_photo,
  cover_photo_url,
  onClick,
}) => (
  <Card className="my-4 mx-auto" onClick={() => onClick()}>
    <div className="h-48 w-full relative">
      <Image
        className="rounded-t-xl object-cover min-w-full min-h-full max-w-full max-h-full"
        src={cover_photo_url}
        fill
        alt=""
      />
    </div>
    <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
      <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{type}</h4>
      <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
      <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">{catch_phrase}</p>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 relative">
          <Image
            src={avatar_photo}
            className="rounded-full object-cover min-w-full min-h-full max-w-full max-h-full"
            fill
            alt=""
          />
        </div>
        <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
      </div>
    </div>
  </Card>
);

export default TripCard;
