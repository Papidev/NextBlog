<<<<<<< HEAD
import { ArrayElement, parameterize } from "@arcath/utils";
import { db } from "sodb";

import { getPosts, Post } from "./posts";
=======
import {parameterize} from '@arcath/utils/lib/functions/parameterize'
import {asyncForEach} from '@arcath/utils/lib/functions/async-for-each'
import {db} from 'sodb'

import {getPosts, PostFrontmatter, PostProperties} from './posts'
import {File} from './file'
>>>>>>> main

import { tagHref } from "@/lib/functions/tag-href";

<<<<<<< HEAD
interface Tag<K extends keyof Post> {
  name: string;
  slug: string;
  href: string;
  posts: Pick<Post, K>[];
}

export const getTags = async <K extends (keyof Post)[]>(postFields: K) => {
  const posts = await getPosts([...postFields, "tags", "slug"], {
    limit: false,
  });

  const tags = db<Tag<ArrayElement<K>>>([], {
    index: "name",
  });

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tags.lookup(tag)) {
        const t = tags.lookup(tag);
=======
interface Tag {
  name: string
  slug: string
  href: string
  posts: File<PostFrontmatter, PostProperties>[]
}

export const getTags = async () => {
  const posts = await getPosts({limit: false})

  const tags = db<Tag>([], {
    index: 'name'
  })

  await asyncForEach(posts, async post => {
    ;(await post.data).tags.forEach(tag => {
      if (tags.lookup(tag)) {
        const t = tags.lookup(tag)
>>>>>>> main

        t.posts.push(post);

<<<<<<< HEAD
        tags.update(t);
=======
        tags.update(t)
>>>>>>> main
      } else {
        const t = {
          name: tag,
          slug: parameterize(tag),
          posts: [post],
          href: tagHref(tag),
        };

        tags.add(t);
      }
    });
  });

  return tags;
};

<<<<<<< HEAD
export const getTag = async <K extends (keyof Post)[]>(
  tag: string,
  postFields: K
) => {
  const tags = await getTags(postFields);
=======
export const getTag = async (tag: string) => {
  const tags = await getTags()
>>>>>>> main

  const slug = parameterize(tag);

  const t = tags.findOne({ slug: { is: slug } });

<<<<<<< HEAD
  return t;
};
=======
  return t
}
>>>>>>> main
