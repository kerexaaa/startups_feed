import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || author->name match $search || category match $search] | order(_createdAt desc) {
    _id, 
    title, 
    slug, 
    _createdAt, 
    views, 
    
    author -> {
      _id, name, slug, image, bio
    },
    
    description, 
    category, 
    image,
}`);

export const USER_STARTUPS_QUERY = defineQuery(`
    *[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
    _id, 
    title, 
    slug, 
    _createdAt, 
    views, 
    
    author -> {
      _id, name, slug, image, bio
    },
    
    description, 
    category, 
    image,
}
  `);

export const STARTUPS_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
  _id,
    title,
    slug,
    _createdAt,
    author->{
      _id, name, username, image, bio
    },
    views,
    description,
    category,
    image,
    pitch
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0] {
    _id, views
  }`);

export const STARTUP_BY_ID = defineQuery(`
  *[_type == "startup" && _id == $id]`);

export const AUTHOR_BY_SESSION = defineQuery(`
  *[_type == "author" && email == $email][0] {    
    _id, name, username, email, image, bio, password
  }
`);

export const AUTHOR_BY_ID = defineQuery(`
    *[_type == "author" && _id == $id][0] {
  _id, email, username, name, image, bio
}
  `);
