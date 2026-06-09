import { InterestingEvent, LatLngPair } from "./types";



const laWildfire: InterestingEvent = {
  label: "LA Wildfires (Jan 8-31, 2025)",
  locations: [
    {
      latlng: [33.4773, -118.5975] as LatLngPair,
      zoom: 8,
      text: "Los Angeles Wildfires",
      time: "2025-01-08T19:51:00.000Z",
      description: `
      <p> 
      Beginning on January 7, 2025, a series of wildfires broke out in the Los Angeles area. 
      In addition to the devastating damage caused by the fires, large amounts of particulate matter, 
      NO<sub>2</sub>, and other pollutants were released into the air.
      </p>
      <p>
      Plumes of NO<sub>2</sub> from the wildfires can be seen from the 
      fires in the Los Angeles Area. On this day, the plumes are being blown south over 
      the Pacific Ocean by the Santa Ana winds. 
      </p>
      <p>
      The levels of NO<sub>2</sub> are so high, they actually exceed the top of the scale shown on the color map.
      </p>
      <p><strong>For these wild fires we created a set of images an extended range of NO<sub>2</sub> values to show 
      more detail of the emissions.
      </strong></p>
      `
    }],
};

const laMississippiFires: InterestingEvent = {
  label: "Louisiana/Mississippi Fires",
  locations: [
    {
      latlng: [31.331933, -91.575283] as LatLngPair,
      zoom: 8,
      text: "LA/MS Fires",
      time: "2024-03-28T16:44:00.000Z",
      description:
        `<p>Two fires can be seen popping up south and east of Alexandria. 
    These are most easily identified as hot spots of NO2 that appear quickly.
    </p>
    `
    },
  ],
};

const texasOilAndGas: InterestingEvent = {
  label: "Texas Oil and Gas Production",
  locations: [
    {
      latlng: [31.938392, -99.095785] as LatLngPair,
      zoom: 6,
      text: "Texas Oil and Gas Production",
      time: "2024-03-28T13:04:00.000Z",
      description:
        `
    <p>The Permian basin, near Odessa, has two large plumes of NO2. 
    This is the largest oil and gas producing area in the USA. 
    You can also see here how pollution from a source in one state (Texas) 
    can be transported across state lines to New Mexico.
    </p>`,
    },
  ],
}; 

const caTraffic: InterestingEvent = {
  label: "Southern California Traffic",
  locations: [
    {
      latlng: [36.215934, -119.7775] as LatLngPair,
      zoom: 6,
      text: "Southern California Traffic",
      time: "2023-11-03T14:22:00.000Z",
      description:
        `
    <p>Los Angeles clearly stands out. NO<sub>2</sub> values are even higher 
    than the maximum of our color bar. 
    You can clearly see the highways including Route 10 between 
    San Bernardino and Mexicali and Route 15 leading from San Bernardino 
    towards Las Vegas. 
    </p>
    <p>
    Levels of NO<sub>2</sub> change quickly from day to day, 
    and even from hour to hour as wind transports 
    plumes of pollution.
    </p>
    `,
    },
  ],
};
const caAgriculture: InterestingEvent = {
  label: "California Agriculture",
  locations: [
    {
      latlng: [36.215934, -119.7775] as LatLngPair,
      zoom: 6,
      text: "California Agriculture",
      time: "2023-11-03T14:22:00.000Z",
      description:
        `
    <p>A significant amount of NO<sub>2</sub> in 
    California's central valley is a byproduct of agricultural activity there. 
    </p>
    <p>
    Excess fertilizer in the soil gets broken down by 
    microbes to produce nitrogen oxides which are very reactive. 
    Emissions that don't come from combustion are typically much harder 
    to see, but the Central Valley is an area where TEMPO data may reveal this 
    agricultural source of pollution.
    </p>
    `,
    },
  ],
};
const northeastPowerPlants: InterestingEvent = {
  label: "Northeast Power Plants",
  locations: [
    {
      latlng: [41.85726, -80.531177] as LatLngPair,
      zoom: 5,
      text: "Northeast: Large Emissions Plumes",
      time: "2023-11-03T13:42:00.000Z",
      description:
        `
    <p>
    Air pollution is often transported, or moved, over great distances. 
    In this data set large plumes can be seen over the Northeast. 
    If you look closely you can see that many of these plumes appear to 
    originate out of cities in the midwest including Nashville, St. Louis, 
    and Memphis.
    </p>
    Levels of NO<sub>2</sub> change quickly from day to day, 
    and even from hour to hour as wind transports 
    plumes of pollution.
    `,
    },
  ],
};
const arizonaFires: InterestingEvent = {
  date: new Date(2023, 10, 1),
  dateString: "Nov 1",
  label: "Arizona Fires",
  highlighted: false,
  hasFeature: true,
  info: `
    <p>
    Fires can be seen between Phoenix and Flagstaff. 
    These are most easily identified as hot spots of NO<sub>2</sub> that appear quickly.
    </p>
    <p>
    Because the TEMPO instrument measures sunlight reflected and scattered from Earth’s 
    surface and atmosphere, it can’t “see” through the clouds&mdash;so these
    areas appear blank on the map.
    </p>
    `,
  locations: [
    {
      latlng: [34.359786, -111.700124] as LatLngPair,
      zoom: 7,
      text: "Arizona Fires",
      time: "2023-11-01T14:22:00.000Z",
      description:
        `
        <p>Fires can be seen between Phoenix and Flagstaff. 
        These are most easily identified as hot spots of NO<sub>2</sub> that appear quickly.
        </p>`,
    },
  ],
};
const arizonaTraffic: InterestingEvent = {
  date: new Date(2023, 10, 1),
  dateString: "Nov 1",
  label: "Arizona Urban Traffic",
  highlighted: false,
  hasFeature: true,
  info: `
    <p>
    NO<sub>2</sub> increases during daily rush hour. 
    In Phoenix, notice the high levels of NO<sub>2</sub> early in the morning, dip down during the day, 
    then start to build back up during the evening commute.
    </p>
    <p>
    Because the TEMPO instrument measures sunlight reflected and scattered from Earth’s 
    surface and atmosphere, it can’t “see” through the clouds&mdash;so these
    areas appear blank on the map.
    </p>
    <p>
    But right away you’ll see that there 
    are high concentrations of NO<sub>2</sub> around many urban centers, 
    and sometimes along major highways.
    </p>
    `,
  locations: [
    {
      latlng: [34.359786, -111.700124] as LatLngPair,
      zoom: 7,
      text: "Arizona Urban Traffic",
      time: "2023-11-01T14:22:00.000Z",
      description:
        `<p>NO<sub>2</sub> increases during daily rush hour. 
        In Phoenix, notice the high levels of NO<sub>2</sub> early in the morning, 
        dip down during the day, then start to build back up during the evening commute.
        </p>
        `,
    },
  ],
};
const lasVegasUrban = {
  label: "Las Vegas: Fairly Constant Levels All Day",
  locations: [
    {
      latlng: [36.1716, -115.1391] as LatLngPair,
      zoom: 7,
      text: "Las Vegas: Fairly Constant Levels All Day",
      time: "2023-11-01T14:22:00.000Z",
      description:
        "<p>In this data we see that Las Vegas has less daily variation than many other cities.</p>",
    },
  ],
};

export const interestingEvents: InterestingEvent[] = [
  {
    label: "Fires",
    info: `
    <p>
    Wildfires release large amounts of many types of pollutents into the 
    air <em>in addition to</em> the smoke that is highly visible to eye. This includes
    nitrogen dioxide (NO<sub>2</sub>) which TEMPO can detect. Fires present themselves 
    as rapidly appearing hot spots of NO<sub>2</sub> that can be tracked as they are transported by wind.
    </p>
    <p>
    However, as with clouds, TEMPO cannot peer through dense smoke plumes, 
    and so can sometimes be masked out the same way clouds are masked out here. When looking for fires, 
    it is often possible to see the start of the fire, followed by a 
    seeing those pixels get masked and go blank as the smoke thickens. 
    Enhanced NO<sub>2</sub> <em>may</em>
    still be visible around the edges of the masked smoke plume.
    `,

    locations: [
      ...laWildfire.locations,
      ...laMississippiFires.locations,
      ...arizonaFires.locations
    ],
  },

  {
    label: "Traffic Patterns",
    info: `
    <p>
    Daily traffic patterns in urban areas lead to predictable changes in NO<sub>2</sub> levels throughout the day.
    </p>
    <p>
    With TEMPO's hourly observations, we can see emissions from cars due to rush hour traffic in the morning and evening around 
    in areas with clear rush hour traffic patterns. 
    
    These emissions are by products of combustion in gasoline and diesel engines. 
    </p>
    `,
    locations: [
      ...caTraffic.locations,
      ...arizonaTraffic.locations,
      ...lasVegasUrban.locations
    ],
  },

  {
    label: "Industrial Sources",
    info: `
    <p>
    Industrial activities such as oil and gas production, power generation, are significant sources of 
    NO<sub>2</sub> emissions. 
    These sources can create large plumes that can be transported over long distances. 
    </p>
    <p>
    Breathing air with a high concentration of NO<sub>2</sub>, 
    and the resulting smog it forms when it reacts with other pollutants, 
    can irritate human respiratory systems. 
    </p>
    <p>
    People with asthma, as well as children and the elderly, 
    are generally at greater risk for the health effects of air pollution. 
    TEMPO data can help communities make informed 
    decisions and take action to improve air quality.
    </p>
    `,
    locations: [
      ...texasOilAndGas.locations,
      ...northeastPowerPlants.locations,
    ],
  },

  {
    label: 'Agriculture',
    info: `
    <p>
    Agricultural activities can also contribute to NO<sub>2</sub> emissions, particularly through the use of fertilizers. 
    In regions with intensive agriculture, such as California's Central Valley, these emissions can be significant and detectable by TEMPO.
    </p>
    `,
    locations: [
      ...caAgriculture.locations,
    ],
  }
];