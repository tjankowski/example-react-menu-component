const URL = "https://www.mocky.io/v2/5d3fec2b33000062009d27bc";

export async function fetchData() {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
