import { client } from "./sanityClient";
import { defineQuery } from "groq";

const generalDataQuery = defineQuery(`
  *[_type == "generalData"][0]{
    name,
    detail,
    coverVideo,
    coverThumbnail,
    colorTitle,
    bio,
    profileImage,
    links
  }`);

export async function getGeneralData() {
  return await client.fetch(generalDataQuery);
}

const dpWorksListQuery = defineQuery(`
  *[_type == "dpWork"] | order(date desc){
    _id,
    title,
    slug,
    date,
    client,
    director,
    production,
    mainImage,
  }`);

export async function getDpWorksList() {
  return await client.fetch(dpWorksListQuery);
}

const dpWorkBySlugQuery = defineQuery(`
  *[_type == "dpWork" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    date,
    client,
    director,
    production,
    mainImage,
    vimeoEmbed,
    images,
    additionalInfo,
  }`);

export async function getDpWorkBySlug(slug: string) {
  return await client.fetch(dpWorkBySlugQuery, { slug });
}

const colorWorksListQuery = defineQuery(`
  *[_type == "colorWork"] | order(date desc){
    _id,
    title,
    slug,
    date,
    client,
    director,
    production,
    mainImage,
  }`);

export async function getColorWorksList() {
  return await client.fetch(colorWorksListQuery);
}

const colorWorkBySlugQuery = defineQuery(`
  *[_type == "colorWork" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    date,
    client,
    director,
    production,
    mainImage,
    vimeoEmbed,
    images,
    additionalInfo,
  }`);

export async function getColorWorkBySlug(slug: string) {
  return await client.fetch(colorWorkBySlugQuery, { slug });
}
