import TripCard from '../TripCard';
import { MediaType } from '../../types/db-schema-definitions';
import Image from 'next/image';

function ImageTape({ media }: { media: { media_type: MediaType | null; media_url: string }[] }) {
  return (
    <section className="flex flex-row overflow-scroll gap-2 h-60">
      {media.map(media => (
        <div key={media.media_url} className="rounded-md overflow-hidden relative w-60">
          <Image fill style={{ objectFit: 'cover' }} src={media.media_url} alt={media.media_type} />
        </div>
      ))}
    </section>
  );
}

export default ImageTape;
