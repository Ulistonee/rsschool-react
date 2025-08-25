import { useCO2Data, type YearData } from '../../hooks/useCO2Data.ts';

export const MainPage = () => {
  const data = useCO2Data();

  const countries = Object.entries(data).map(([country, countryData]) => {
    const latest: YearData | undefined =
      countryData.data[countryData.data.length - 1];

    return {
      name: country,
      population: latest?.population,
      iso_code: countryData.iso_code,
    };
  });

  return (
    <div>
      <div>
        <h2>Countries</h2>
        <ul>
          {countries.map((c) => (
            <li key={c.name}>
              {c.name} – {c.population} – {c.iso_code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
