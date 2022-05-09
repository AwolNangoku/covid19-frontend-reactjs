export default async function serverGet({ url }) {
  try {
    const response = await fetch(`https://covid-api.mmediagroup.fr/v1/${url}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return new TypeError("Get request failed");
    }
    return response.json();
  } catch (e) {
    new TypeError("Get request failed");
  }
}
