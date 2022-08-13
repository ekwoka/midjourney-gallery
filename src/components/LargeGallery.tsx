import { useState } from 'preact/hooks';
import { API_Options, Job } from '../../api/midjourney';
import { useAsyncEffect } from '../hooks';
import { makeImageURL, makeImageURLS } from '../utils/makeImageURL';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { classNames } from '../utils';
import { randomize } from '../utils/randomize';

export const LargeGallery = () => {
  const [images, setImages] = useState<DisplayImage[]>([]);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [container] = useAutoAnimate();
  useAsyncEffect(async () => {
    const options: API_Options = {
      amount: 100,
      orderBy: 'top-week',
    };
    const response = await fetch(
      `/api/images?${new URLSearchParams(
        options as unknown as Record<string, string>
      ).toString()}`
    );
    const json = (await response.json()) as Job[];
    const results = json.map(({ id, prompt, event: { width } }) => ({
      id,
      prompt,
      src: makeImageURL(id, 180),
      srcset: makeImageURLS(id, width),
    }));
    setImages(randomize(results));
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % results.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  if (!images[currentImage]) return <div />;
  return (
    <div ref={container} class="relative h-screen w-full">
      {images.map(({ id, prompt, src, srcset }, i) => (
        <div
          class={classNames(
            'absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-1000',
            currentImage === i ? 'opacity-100' : 'opacity-0'
          )}
          key={id}
          id={id}>
          <img
            src={src}
            srcset={srcset}
            alt={prompt}
            class="absolute -inset-8 h-full w-full object-cover blur-3xl group-hover:opacity-75"
            loading="lazy"
            sizes="100vw"
          />
          <img
            src={src}
            srcset={srcset}
            alt={prompt}
            class="z-10 max-h-full max-w-full object-cover group-hover:opacity-75"
            loading="lazy"
            sizes="100vw"
          />
          <p class="pointer-events-none mt-2 hidden truncate text-sm font-medium text-gray-900">
            {prompt}
          </p>
          <p class="pointer-events-none hidden text-sm font-medium text-gray-500">
            {id}
          </p>
        </div>
      ))}
    </div>
  );
};

type DisplayImage = {
  prompt: string;
  id: string;
  src: string;
  srcset: string;
};
