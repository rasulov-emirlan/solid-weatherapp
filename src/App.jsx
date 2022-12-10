import Weather from "./components/Weather";

function App() {
  return (
    <article class='min-h-screen w-screen bg-black text-white px-3'>
      <header class='w-full text-center py-24'>
        <h1 class='text-4xl'>
          <a href='https://solidjs.com' class='text-[#446B9E] font-bold'>
            SOLID
          </a>{" "}
          Weather App
        </h1>
      </header>

      <Weather />
    </article>
  );
}

export default App;
