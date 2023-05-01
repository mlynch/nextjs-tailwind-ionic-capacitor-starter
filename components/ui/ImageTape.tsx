import TripCard from '../TripCard';
import { MediaType } from '../../types/db-schema-definitions';
import Image from 'next/image';

function ImageTape({ media }: { media: { media_type: MediaType | null; media_url: string }[] }) {
  if (!media.length) return;
  return (
    <div className="flex flex-row overflow-scroll gap-2 w-full h-60 ">
      {media.map(media => (
        <div key={media.media_url} className={'flex-shrink-0 w-full md:w-60 lg:w-80 h-full'}>
          <div className=" rounded-md overflow-hidden relative w-full h-full">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={media.media_url}
              alt={media.media_type}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageTape;
