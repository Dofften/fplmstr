import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/lib/authOptions";

import { Lexend } from "next/font/google";



import PlayerItem from "@/components/PlayerItem";

export const metadata = {
  title: "FPL Mstr Dashboard",
  description: "FPL Team Analysis.",
};


const lexend = Lexend({ subsets: ["latin"] });

async function getGameweek() {
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
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getData(x) {
  const res = await fetch(`https://fplmstrapi.crepant.com/api/fpl/${x}`, {
    method: "GET",
    next: { revalidate: 21600 },
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.Authorization,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getFixtures() {
  const res = await fetch("https://fplmstrapi.crepant.com/api/fixtures", {
    method: "GET",
    next: { revalidate: 21600 },
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.Authorization,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
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

// Helper function to get player captain status
function getPlayerCaptainStatus(player) {
  if (player.is_captain) {
    return "C";
  } else if (player.is_vice_captain) {
    return "V";
  } else {
    return "";
  }
}

function getAllPoints(data) {
  let totalPoints = 0; // Initialize a variable to store the sum
  for (let player of data) {
    // Loop through each player object in data
    if (player.position <= 11) {
      if (player.is_captain) {
        totalPoints += player.preds * 2;
      } else {
        totalPoints += player.preds; // Add the player's predicted points to the sum
      }
    }
  }
  return totalPoints;
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user.id);
  const fixtures = await getFixtures();
  const gameweek = await getGameweek();
  const allPoints = getAllPoints(data.my_team);
  const teamName = session?.user?.name

  return (
    <>
      <div className="m-3 rounded shadow-sm overflow-auto bg-gradient-to-b from-[#02efff] to-white to-40%">
        <h3
          className={`${lexend.className} text-center py-4 px-4 mx-1 text-xl font-bold`}
        >
          {teamName}
          {" "}
          Gameweek {gameweek}{" "}
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
            <div className="flex md:mb-1 max-w-[620px] m-auto justify-around">
              {data.my_team
                .filter(
                  (player) => player.element_type === 1 && player.position <= 11
                )
                .map((player) => (
                  <PlayerItem
                    key={player.id}
                    elementName={player.web_name}
                    team={player.team_name}
                    position={getPlayerPosition(player.element_type)}
                    now_cost={player.now_cost}
                    fixture={getPlayerFixtures(player, gameweek + 1, fixtures)}
                    fixture1={getPlayerFixtures(player, gameweek + 2, fixtures)}
                    fixture2={getPlayerFixtures(player, gameweek + 3, fixtures)}
                    form={player.form}
                    selected_by_percent={player.selected_by_percent}
                    predictedPoints={player.preds}
                    captain={getPlayerCaptainStatus(player)}
                    news={player.news != "" ? player.news : null}
                    image={player.image}
                  />
                ))}
            </div>
            <div className="flex md:mb-1 max-w-[620px] m-auto justify-around">
              {data.my_team
                .filter(
                  (player) => player.element_type === 2 && player.position <= 11
                )
                .map((player) => (
                  <PlayerItem
                    key={player.id}
                    elementName={player.web_name}
                    team={player.team_name}
                    position={getPlayerPosition(player.element_type)}
                    now_cost={player.now_cost}
                    fixture={getPlayerFixtures(player, gameweek + 1, fixtures)}
                    fixture1={getPlayerFixtures(player, gameweek + 2, fixtures)}
                    fixture2={getPlayerFixtures(player, gameweek + 3, fixtures)}
                    form={player.form}
                    selected_by_percent={player.selected_by_percent}
                    predictedPoints={player.preds}
                    captain={getPlayerCaptainStatus(player)}
                    news={player.news != "" ? player.news : null}
                    image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                  />
                ))}
            </div>
            <div className="flex md:mb-1 max-w-[620px] m-auto justify-around">
              {data.my_team
                .filter(
                  (player) => player.element_type === 3 && player.position <= 11
                )
                .map((player) => (
                  <PlayerItem
                    key={player.id}
                    elementName={player.web_name}
                    team={player.team_name}
                    position={getPlayerPosition(player.element_type)}
                    now_cost={player.now_cost}
                    fixture={getPlayerFixtures(player, gameweek + 1, fixtures)}
                    fixture1={getPlayerFixtures(player, gameweek + 2, fixtures)}
                    fixture2={getPlayerFixtures(player, gameweek + 3, fixtures)}
                    form={player.form}
                    selected_by_percent={player.selected_by_percent}
                    predictedPoints={player.preds}
                    captain={getPlayerCaptainStatus(player)}
                    news={player.news != "" ? player.news : null}
                    image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                  />
                ))}
            </div>
            <div className="flex mb-4 md:mb-1 max-w-[620px] m-auto justify-around">
              {data.my_team
                .filter(
                  (player) => player.element_type === 4 && player.position <= 11
                )
                .map((player) => (
                  <PlayerItem
                    key={player.id}
                    elementName={player.web_name}
                    team={player.team_name}
                    position={getPlayerPosition(player.element_type)}
                    now_cost={player.now_cost}
                    fixture={getPlayerFixtures(player, gameweek + 1, fixtures)}
                    fixture1={getPlayerFixtures(player, gameweek + 2, fixtures)}
                    fixture2={getPlayerFixtures(player, gameweek + 3, fixtures)}
                    form={player.form}
                    selected_by_percent={player.selected_by_percent}
                    predictedPoints={player.preds}
                    captain={getPlayerCaptainStatus(player)}
                    news={player.news != "" ? player.news : null}
                    image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                  />
                ))}
            </div>
            <div className="md:mb-1 max-w-[620px] m-auto bg-white/60 rounded">
              <div className="flex bg-[#72cf9f]/90 justify-around rounded">
                {data.my_team
                  .filter((player) => player.position > 11)
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
                      captain={getPlayerCaptainStatus(player)}
                      news={player.news != "" ? player.news : null}
                      image={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${player.photo}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
