import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'preact/hooks';
import { Job } from '../../api/midjourney';
import { useAsyncEffect } from '../hooks';
import { makeImageURL, makeImageURLS } from '../utils/makeImageURL';

export const SimpleGallery = () => {
  const [images, setImages] = useState<DisplayImage[]>([]);
  const [container] = useAutoAnimate();
  useAsyncEffect(async () => {
    const response = await fetch('/api/images?amount=5');
    const json = (await response.json()) as Job[];
    const results = json.map(({ id, prompt, event: { width } }) => ({
      id,
      prompt,
      src: makeImageURL(id, 180),
      srcset: makeImageURLS(id, width),
    }));
    setImages(results);
  }, []);
  return (
    <ul
      ref={container}
      role="list"
      class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {images.map(({ id, prompt, src, srcset }) => (
        <li key={id} class="relative">
          <div class="aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img
              src={src}
              srcset={srcset}
              alt={prompt}
              class="pointer-events-none h-auto w-full object-cover group-hover:opacity-75"
              loading="lazy"
              sizes="20vw"
            />
          </div>
          <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {prompt}
          </p>
          <p class="pointer-events-none block text-sm font-medium text-gray-500">
            {id}
          </p>
        </li>
      ))}
    </ul>
  );
};

type DisplayImage = {
  prompt: string;
  id: string;
  src: string;
  srcset: string;
};
