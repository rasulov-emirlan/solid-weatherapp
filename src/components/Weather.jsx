import { createSignal, Show } from "solid-js";

const apiKey = import.meta.env.VITE_API_KEY;

const Weather = () => {
  const [currentWeather, setCurrentWeather] = createSignal({
    temp: "unknown",
    description: "unknown",
    icon: "",
    location: {
      country: "unknown",
      city: "unknown",
      flag: "",
    },
  });

  const [searchedCity, setSearchedCity] = createSignal("London");
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const fetchWeather = async (name) => {
    setLoading(true);
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${name}&aqi=no`
    );

    if (response.status !== 200) {
      setCurrentWeather({
        temp: "unknown",
        description: "unknown",
        icon: "",
        location: {
          country: "unknown",
          city: "unknown",
          flag: "",
        },
      });
      setError(true);
      setLoading(false);
      return;
    }

    const data = await response.json();

    setCurrentWeather({
      temp: data.current.temp_c,
      description: data.current.condition.text,
      icon: data.current.condition.icon,
      location: {
        country: data.location.country,
        city: data.location.name,
      },
    });

    setLoading(false);
  };

  fetchWeather(searchedCity());

  return (
    <section class='h-full max-w-[700px] mx-auto flex flex-col gap-10'>
      <Show
        when={!loading()}
        fallback={
          <img
            src='https://acegif.com/wp-content/uploads/loading-7.gif'
            class='w-full'
          />
        }>
        <form
          class='flex gap-2 sm:gap-5 h-16'
          onSubmit={(e) => {
            if (e.key !== "Enter") {
              e.preventDefault();
              fetchWeather(searchedCity());
            }
          }}>
          <input
            type='text'
            value={searchedCity()}
            onChange={(e) => {
              setSearchedCity(e.target.value);
            }}
            class='w-[70%] h-full rounded-md border-none focus:outline-none text-black p-2 text-2xl'
          />
          <input
            type='button'
            value='Search'
            onClick={(e) => {
              e.preventDefault();
              fetchWeather(searchedCity());
            }}
            class='w-[30%] bg-[#446B9E] text-white rounded-md hover:bg-[#2E4E7E] transition-colors duration-300 h-full text-2xl'
          />
        </form>

        <Show
          when={!error()}
          fallback={
            <h1 class='text-red-400'>
              Could not find the City. Try another one
            </h1>
          }>
          <div class='text-center text-2xl'>
            <h2>Country of {currentWeather().location.country}</h2>

            <h2>Temperature is {currentWeather().temp}°</h2>

            <img
              src={currentWeather().icon}
              alt='current weather icon'
              class='h-24 w-24 mx-auto'
            />
          </div>
        </Show>
      </Show>
    </section>
  );
};

export default Weather;
