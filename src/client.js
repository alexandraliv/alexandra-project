import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "kst3xiph",
    dataset: "production",
    useCdn: "false",
    apiVersion: "2023-06-25",
    token: "skummFMHRv9x1wezgSZ5qE9STFWsIzGLIoeQ6blRBVZlWp9iEQ3WwgBGJQLeKjK4Ejyw9F1AAWKkwR9hFrLitzgakF6DGTE8eaJMkRjeSxGHCsD3R3YmhKMit01ifraos24iPhJkede2VKw7JbJ2rP4VgXgtc4ySchMZLH8SCh3Dc8NXBYep"
});

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)