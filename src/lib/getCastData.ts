export async function getCastData(id: string) {
  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";

  const url = `${baseUrl}/api/casts?filters[customId][$eq]=${id}&populate=*`;

  console.log("✅ DEBUG: fetch URL =>", url);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Cast fetch failed");
  }

  const json = await res.json();
  console.log("✅ DEBUG: API response json =>", json);

  const cast = json.data?.[0];
  return cast;
}
