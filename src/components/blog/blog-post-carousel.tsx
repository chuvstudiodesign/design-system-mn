"use client";

import type { BlogPost } from "@/data/blog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogPostCard } from "./blog-post-card";

export function BlogPostCarousel({
  posts,
  basePath,
}: {
  posts: BlogPost[];
  basePath?: string;
}) {
  return (
    <div className="relative ml-[calc(var(--section-padding-x)*-1)] w-[calc(100%+var(--section-padding-x)*2)] overflow-hidden">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {posts.map((post) => (
            <CarouselItem
              key={post.id}
              className="pl-4 basis-full md:basis-1/2 xl:basis-1/3 shrink-0"
            >
              <BlogPostCard post={post} basePath={basePath} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
    </div>
  );
}
