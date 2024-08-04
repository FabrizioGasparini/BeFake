
export default async function getAddressFromCoordinates(latitude, longitude)
{
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=c98bf33bcefaeee390d09b2546e6a7d2`;
  const defaultResponse = latitude.toFixed(2) + ", " + longitude.toFixed(2);

  try
  {
    const response = await fetch(url);
    const resJson = await response.json();

    if(resJson[0].name) return(`${resJson[0].name}, ${resJson[0].state}`)

    return(defaultResponse);
  }
  catch (error) { return (defaultResponse) }
}