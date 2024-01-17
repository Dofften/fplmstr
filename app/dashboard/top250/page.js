import PlayerItem from "@/components/PlayerItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

async function getGameweek() {
  try {
    const res = await fetch(
      "https://fplmstrapi.crepant.com/api/gameweek_number",
      {
        method: "GET",
        next: { revalidate: 21600 },
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.Authorization,
        },
      }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch gameweek");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching gameweek:", error.message);
    throw error; // Re-throw the error for the closest error boundary
  }
}

async function getData(x) {
  try {
    const res = await fetch(`https://fplmstrapi.crepant.com/api/fpl/${x}`, {
      method: "GET",
      next: { revalidate: 21600 },
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.Authorization,
      },
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Re-throw the error for the closest error boundary
  }
}

async function getTopManagersData() {
  try {
    const res = await fetch("https://fplmstrapi.crepant.com/api/top250", {
      method: "GET",
      next: { revalidate: 21600 },
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.Authorization,
      },
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch top 250 data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching top 250 data:", error.message);
    throw error; // Re-throw the error for the closest error boundary
  }
}

async function getFixtures() {
  try {
    const res = await fetch("https://fplmstrapi.crepant.com/api/fixtures", {
      method: "GET",
      next: { revalidate: 21600 },
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.Authorization,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch fixtures");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching fixtures:", error.message);
    throw error; // Re-throw the error for the closest error boundary
  }
}

// Helper function to get player position based on element type
function getPlayerPosition(elementType) {
  if (elementType === 1) {
    return "Goalkeeper";
  } else if (elementType === 2) {
    return "Defender";
  } else if (elementType === 3) {
    return "Midfielder";
  } else if (elementType === 4) {
    return "Forward";
  } else {
    return "";
  }
}

// Helper function to get player fixtures for a specific gameweek
function getPlayerFixtures(player, gameweek, fixtures) {
  return fixtures.fixtures
    .filter(
      (fixture) =>
        fixture.event === gameweek &&
        (fixture.team_name_a === player.team_name ||
          fixture.team_name_h === player.team_name)
    )
    .map((fixture) => {
      if (fixture.team_name_h === player.team_name) {
        return `${fixture.team_short_name_a} (H)`;
      } else if (fixture.team_name_a === player.team_name) {
        return `${fixture.team_short_name_h} (A)`;
      }
      return null;
    });
}

function getAllPoints(data) {
  let totalPoints = 0; // Initialize a variable to store the sum
  for (let player of data) {
    // Loop through each player object in ai_data
    totalPoints += player.preds; // Add the player's predicted points to the sum
  }
  return totalPoints;
}

export const metadata = {
  title: "FPL Mstr top 250 Managers",
  description: "FPL Team built from most selected players by top 250 managers.",
};

export default async function Top250() {
  const session = await getServerSession(authOptions);
  if (session === null) {
    return (
      <p>
        No session found, please go to <a href="/signin">this page</a> to log in
      </p>
    );
  }
  const data = await getData(session?.user.id);
  const top250 = await getTopManagersData();
  const fixtures = await getFixtures();
  const gameweek = await getGameweek();
  const allPoints = getAllPoints(data.my_team);
  const allTop250Points = getAllPoints(top250.top250);
  const teamName = session?.user.name;

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-around">
        <div className="m-3 rounded shadow-sm overflow-auto bg-gradient-to-b from-[#02efff] to-white to-40% md:w-2/4">
          <h3
            className={`${lexend.className} text-center py-4 px-4 mx-1 text-xl font-bold text-[#37003c]`}
          >
            {teamName} Gameweek {gameweek}{" "}
          </h3>
          <div className="relative mb-8 flex justify-around items-stretch text-center py-6">
            {/* <div> points 1</div> */}
            <div className="basis-2/5 md:basis-1/6 lg:basis-1/6 rounded bg-[#37003c]">
              <div className="relative py-4">
                <div>
                  <h4 className="mb-2 text-white text-xs">
                    GW {gameweek + 1} Predicted Points
                  </h4>
                  <div className="text-transparent bg-gradient-to-r from-[#00ff87] to-[#02efff] bg-clip-text font-bold text-6xl">
                    {allPoints}
                  </div>
                </div>
              </div>
            </div>
            {/* <div> points 3</div> */}
          </div>
          <div className="m-0 min-w-0 pt-8">
            <div className="min-h-[524px] pt-1 bg-[length:625px_460px] md:bg-[length:938px_690px] bg-[url('/pitch.svg')] bg-no-repeat bg-top">
              <div className="flex md:mb-1 max-w-sm m-auto justify-around">
                {data.my_team
                  .filter((player) => player.element_type === 1)
                  .map((player) => (
                    <PlayerItem
                      key={player.id}
                      elementName={player.web_name}
                      team={player.team_name}
                      position={getPlayerPosition(player.element_type)}
                      now_cost={player.now_cost}
                      fixture={getPlayerFixtures(
                        player,
                        gameweek + 1,
                        fixtures
                      )}
                      fixture1={getPlayerFixtures(
                        player,
                        gameweek + 2,
                        fixtures
                      )}
                      fixture2={getPlayerFixtures(
                        player,
                        gameweek + 3,
                        fixtures
                      )}
                      form={player.form}
                      selected_by_percent={player.selected_by_percent}
                      predictedPoints={player.preds}
                      news={player.news != "" ? player.news : null}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
              <div className="flex md:mb-1 max-w-md lg:max-w-[620px] m-auto justify-around">
                {data.my_team
                  .filter((player) => player.element_type === 2)
                  .map((player) => (
                    <PlayerItem
                      key={player.id}
                      elementName={player.web_name}
                      team={player.team_name}
                      position={getPlayerPosition(player.element_type)}
                      now_cost={player.now_cost}
                      fixture={getPlayerFixtures(
                        player,
                        gameweek + 1,
                        fixtures
                      )}
                      fixture1={getPlayerFixtures(
                        player,
                        gameweek + 2,
                        fixtures
                      )}
                      fixture2={getPlayerFixtures(
                        player,
                        gameweek + 3,
                        fixtures
                      )}
                      form={player.form}
                      selected_by_percent={player.selected_by_percent}
                      predictedPoints={player.preds}
                      news={player.news != "" ? player.news : null}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
              <div className="flex md:mb-1 max-w-lg lg:max-w-[620px] m-auto justify-around">
                {data.my_team
                  .filter((player) => player.element_type === 3)
                  .map((player) => (
                    <PlayerItem
                      key={player.id}
                      elementName={player.web_name}
                      team={player.team_name}
                      position={getPlayerPosition(player.element_type)}
                      now_cost={player.now_cost}
                      fixture={getPlayerFixtures(
                        player,
                        gameweek + 1,
                        fixtures
                      )}
                      fixture1={getPlayerFixtures(
                        player,
                        gameweek + 2,
                        fixtures
                      )}
                      fixture2={getPlayerFixtures(
                        player,
                        gameweek + 3,
                        fixtures
                      )}
                      form={player.form}
                      selected_by_percent={player.selected_by_percent}
                      predictedPoints={player.preds}
                      news={player.news != "" ? player.news : null}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
              <div className="flex md:mb-1 max-w-md m-auto justify-around">
                {data.my_team
                  .filter((player) => player.element_type === 4)
                  .map((player) => (
                    <PlayerItem
                      key={player.id}
                      elementName={player.web_name}
                      team={player.team_name}
                      position={getPlayerPosition(player.element_type)}
                      now_cost={player.now_cost}
                      fixture={getPlayerFixtures(
                        player,
                        gameweek + 1,
                        fixtures
                      )}
                      fixture1={getPlayerFixtures(
                        player,
                        gameweek + 2,
                        fixtures
                      )}
                      fixture2={getPlayerFixtures(
                        player,
                        gameweek + 3,
                        fixtures
                      )}
                      form={player.form}
                      selected_by_percent={player.selected_by_percent}
                      predictedPoints={player.preds}
                      news={player.news != "" ? player.news : null}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="m-3 rounded shadow-sm overflow-auto bg-gradient-to-b from-[#02efff] to-white to-40% md:w-2/4">
          <h3
            className={`${lexend.className} text-center py-4 px-4 mx-1 text-xl font-bold text-[#37003c]`}
          >
            Top 250 Gameweek {gameweek}
          </h3>
          <div className="relative mb-8 flex justify-around items-stretch text-center py-6">
            {/* <div> points 1</div> */}
            <div className="basis-2/5 md:basis-1/6 lg:basis-1/6 rounded bg-[#37003c]">
              <div className="relative py-4">
                <div>
                  <h4 className="mb-2 text-white text-xs">
                    GW {gameweek + 1} Predicted Points
                  </h4>
                  <div className="text-transparent bg-gradient-to-r from-[#00ff87] to-[#02efff] bg-clip-text font-bold text-6xl">
                    {allTop250Points}
                  </div>
                </div>
              </div>
            </div>
            {/* <div> points 3</div> */}
          </div>
          <div className="m-0 min-w-0 pt-8">
            <div className="min-h-[524px] pt-1 bg-[length:625px_460px] md:bg-[length:938px_690px] bg-[url('/pitch.svg')] bg-no-repeat bg-top">
              <div className="flex md:mb-1 max-w-sm m-auto justify-around">
                {top250.top250
                  .filter((player) => player.element_type === 1)
                  .map((player) => (
                    <PlayerItem
                      key={player.id}
                      elementName={player.web_name}
                      team={player.team_name}
                      position={getPlayerPosition(player.element_type)}
                      now_cost={player.now_cost}
                      fixture={getPlayerFixtures(
                        player,
                        gameweek + 1,
                        fixtures
                      )}
                      fixture1={getPlayerFixtures(
                        player,
                        gameweek + 2,
                        fixtures
                      )}
                      fixture2={getPlayerFixtures(
                        player,
                        gameweek + 3,
                        fixtures
                      )}
                      form={player.form}
                      selected_by_percent={player.selected_by_percent}
                      predictedPoints={player.preds}
                      news={player.news != "" ? player.news : null}
                      top250={player.top_ownership}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
              <div className="flex md:mb-1 max-w-md lg:max-w-[620px] m-auto justify-around">
                {top250.top250
                  .filter((player) => player.element_type === 2)
                  .map((player) => (
                    <PlayerItem
                      key={player.id}
                      elementName={player.web_name}
                      team={player.team_name}
                      position={getPlayerPosition(player.element_type)}
                      now_cost={player.now_cost}
                      fixture={getPlayerFixtures(
                        player,
                        gameweek + 1,
                        fixtures
                      )}
                      fixture1={getPlayerFixtures(
                        player,
                        gameweek + 2,
                        fixtures
                      )}
                      fixture2={getPlayerFixtures(
                        player,
                        gameweek + 3,
                        fixtures
                      )}
                      form={player.form}
                      selected_by_percent={player.selected_by_percent}
                      predictedPoints={player.preds}
                      news={player.news != "" ? player.news : null}
                      top250={player.top_ownership}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
              <div className="flex md:mb-1 max-w-lg lg:max-w-[620px] m-auto justify-around">
                {top250.top250
                  .filter((player) => player.element_type === 3)
                  .map((player) => (
                    <PlayerItem
                      key={player.id}
                      elementName={player.web_name}
                      team={player.team_name}
                      position={getPlayerPosition(player.element_type)}
                      now_cost={player.now_cost}
                      fixture={getPlayerFixtures(
                        player,
                        gameweek + 1,
                        fixtures
                      )}
                      fixture1={getPlayerFixtures(
                        player,
                        gameweek + 2,
                        fixtures
                      )}
                      fixture2={getPlayerFixtures(
                        player,
                        gameweek + 3,
                        fixtures
                      )}
                      form={player.form}
                      selected_by_percent={player.selected_by_percent}
                      predictedPoints={player.preds}
                      news={player.news != "" ? player.news : null}
                      top250={player.top_ownership}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
              <div className="flex md:mb-1 max-w-md m-auto justify-around">
                {top250.top250
                  .filter((player) => player.element_type === 4)
                  .map((player) => (
                    <PlayerItem
                      key={player.id}
                      elementName={player.web_name}
                      team={player.team_name}
                      position={getPlayerPosition(player.element_type)}
                      now_cost={player.now_cost}
                      fixture={getPlayerFixtures(
                        player,
                        gameweek + 1,
                        fixtures
                      )}
                      fixture1={getPlayerFixtures(
                        player,
                        gameweek + 2,
                        fixtures
                      )}
                      fixture2={getPlayerFixtures(
                        player,
                        gameweek + 3,
                        fixtures
                      )}
                      form={player.form}
                      selected_by_percent={player.selected_by_percent}
                      predictedPoints={player.preds}
                      news={player.news != "" ? player.news : null}
                      top250={player.top_ownership}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
