import TripCard from '../TripCard';
import { MediaType } from '../../types/db-schema-definitions';
import Image from 'next/image';

function ImageTape({ media }: { media: { media_type: MediaType | null; media_url: string }[] }) {
  return (
    <section className="columns-7 max-w-7xl mx-auto space-y-4">
      {media.map(media => (
        <div key={media.media_url} className="rounded-md overflow-hidden">
          <img src={media.media_url} alt={media.media_type} height={300} width={200} />
        </div>
      ))}
    </section>
  );
}

export default ImageTape;
