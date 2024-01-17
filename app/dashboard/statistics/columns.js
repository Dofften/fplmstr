"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";

// import { labels, priorities, statuses } from "../data/data"
// import { Task } from "../data/schema"
// import { DataTableColumnHeader } from "./data-table-column-header"
// import { DataTableRowActions } from "./data-table-row-actions"

// filterFn: (row, id, value) => {
//   return value.includes(row.getValue(id))
// },

export const columns = [
  {
    accessorKey: "news",
    header: "",
    cell: ({ row }) => {
      const news = row.original.news;

      return (
        <div className="flex space-x-2 max-w-4">
          {news && (
            <div>
              <TooltipProvider delayDuration={10}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fill="#ffe65b"
                          d="M20.7588154,16.1639512 L12.2281283,0.988998469 C11.879948,0.378360845 11.2183513,0 10.4998191,0 C9.78128692,0 9.11969017,0.378360845 8.77150994,0.988998469 L0.240822794,16.1639512 C-0.0919261004,16.7567989 -0.0793835139,17.4770055 0.275542057,18.0585846 C0.629499774,18.6401876 1.27376405,18.9979533 1.9691369,18.9999129 L19.0053273,18.9999129 C19.7055147,19.0063793 20.357507,18.6523673 20.7182051,18.0688941 C21.0789032,17.485421 21.0943345,16.7605391 20.7587117,16.1639512 L20.7588154,16.1639512 Z"
                        ></path>
                        <path
                          fill="#2f2f2f"
                          d="M10.4998191,17.0817658 C10.1005303,17.0817658 9.73983219,16.8485635 9.5874447,16.4898532 C9.43409676,16.1311524 9.51896909,15.7190817 9.80155504,15.4446556 C10.084141,15.1702295 10.5085076,15.087825 10.8778966,15.2367406 C11.2472857,15.3847163 11.4874466,15.73498 11.4874466,16.1227154 C11.4874466,16.3774574 11.3832838,16.6209548 11.1981029,16.8007727 C11.012922,16.9805906 10.762174,17.0817442 10.4998413,17.0817442 L10.4998191,17.0817658 Z M12.3390363,6.77220598 L11.5964066,13.2456505 C11.5308247,13.7860393 11.0601616,14.1934347 10.4998191,14.1934347 C9.93947659,14.1934347 9.46880862,13.7860393 9.40323163,13.2456505 L8.66060187,6.77220598 C8.62298893,6.4678342 8.72136182,6.16156835 8.93162544,5.93305576 C9.14187672,5.70360092 9.44278522,5.5724849 9.75913987,5.57341497 L11.2405477,5.57341497 C11.5568777,5.57248346 11.857801,5.70360092 12.0680622,5.93305576 C12.2783134,6.16157315 12.3766888,6.4678342 12.3390857,6.77220598 L12.3390363,6.77220598 Z"
                        ></path>
                      </svg>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-[#ffe65b] rounded">
                    <p className="whitespace-normal">{news}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "web_name",
    header: "Player",
  },
  {
    accessorKey: "element_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const position = row.original.element_type;
      function playerPosition(x) {
        if (x === 4) {
          return "FWD";
        } else if (x === 3) {
          return "MID";
        } else if (x === 2) {
          return "DEF";
        } else if (x === 1) {
          return "GK";
        } else {
          return "";
        }
      }
      return <div>{playerPosition(position)}</div>;
    },
  },
  {
    accessorKey: "team_name",
    header: "Team",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "chance_of_playing_next_round",
  //   header: "chance_of_playing_next_round",
  // },
  {
    accessorKey: "now_cost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>£{row.original.now_cost / 10}m</div>,
  },
  {
    accessorKey: "selected_by_percent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>Sel.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Selected by %</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.selected_by_percent}%</div>,
  },
  {
    accessorKey: "total_points",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>tPts.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Total points</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "points_per_game",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>PPG.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Points per game</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "preds",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>pPts.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Predicted points</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "chance_of_playing_this_round",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>Chance.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Chance of playing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "code",
  //   header: "code",
  // },
  // {
  //   accessorKey: "cost_change_event",
  //   header: "Cost change event",
  // },
  // {
  //   accessorKey: "cost_change_event_fall",
  //   header: "Cost change event fall",
  // },
  // {
  //   accessorKey: "cost_change_start",
  //   header: "Cost change start",
  // },
  // {
  //   accessorKey: "cost_change_start_fall",
  //   header: "Cost change start fall",
  // },
  // {
  //   accessorKey: "dreamteam_count",
  //   header: "Dreamteam count",
  // },
  // {
  //   accessorKey: "ep_next",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ep next
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "ep_this",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ep this
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "first_name",
  //   header: "first_name",
  // },
  // {
  //   accessorKey: "form",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Form
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "id",
  //   header: "id",
  // },
  // {
  //   accessorKey: "in_dreamteam",
  //   header: "in_dreamteam",
  // },
  // {
  //   accessorKey: "news_added",
  //   header: "news_added",
  // },
  // {
  //   accessorKey: "photo",
  //   header: "photo",
  // },
  // {
  //   accessorKey: "event_points",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Points
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "second_name",
  //   header: "second_name",
  // },
  // {
  //   accessorKey: "special",
  //   header: "special",
  // },
  // {
  //   accessorKey: "squad_number",
  //   header: "Squad number",
  // },
  // {
  //   accessorKey: "status",
  //   header: "status",
  // },
  // {
  //   accessorKey: "team",
  //   header: "Team",
  // },
  // {
  //   accessorKey: "team_code",
  //   header: "team_code",
  // },
  // {
  //   accessorKey: "transfers_in",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Transfers in
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "transfers_in_event",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transfers in
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "transfers_out",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Transfers out
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "transfers_out_event",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transfers out
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value_form",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value form
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value_season",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value season
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "minutes",
    header: "Minutes",
  },
  {
    accessorKey: "goals_scored",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>Gls.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Goals scored</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expected_goals",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>xG.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Expected goals</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expected_goals_per_90",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>xG/90</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Expected goals per 90</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expected_goal_involvements",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>xGi.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">
                    Expected goal involvements
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expected_goal_involvements_per_90",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>xGi/90</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">
                    Expected goal involvements per 90
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "goals_conceded",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>Glsc.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Goals conceded</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "goals_conceded_per_90",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>Glsc/90.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Goals conceded per 90</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expected_goals_conceded",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>xGc.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Expected goals conceded</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expected_goals_conceded_per_90",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>xGc/90.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">
                    Expected goals conceded per 90
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "own_goals",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>oGls.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Own goals</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "assists",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>Ast.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Assists</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expected_assists",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>xA.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Expected Assists</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expected_assists_per_90",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>xA/90</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Expected assists per 90</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "clean_sheets",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>Cls.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Clean sheets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "ict_index",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>ICT.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">
                    Influence, creativity and threat index
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "penalties_saved",
  //   header: "Penalties saved",
  // },
  // {
  //   accessorKey: "penalties_missed",
  //   header: "Penalties missed",
  // },
  {
    accessorKey: "yellow_cards",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>YC.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Yellow cards</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "red_cards",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div>
            <TooltipProvider delayDuration={10}>
              <Tooltip>
                <TooltipTrigger asChild className="underline decoration-dotted">
                  <div>RC.</div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-white rounded">
                  <p className="whitespace-normal">Red cards</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "saves",
    header: "Saves",
  },
  {
    accessorKey: "bonus",
    header: "Bonus",
  },
  {
    accessorKey: "bps",
    header: "bps",
  },
  {
    accessorKey: "influence",
    header: "Influence",
  },
  {
    accessorKey: "creativity",
    header: "Creativity",
  },
  {
    accessorKey: "threat",
    header: "Threat",
  },
  {
    accessorKey: "starts",
    header: "Starts",
  },
  // {
  //   accessorKey: "influence_rank",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         <div>
  //           <TooltipProvider delayDuration={10}>
  //             <Tooltip>
  //               <TooltipTrigger asChild className="underline decoration-dotted">
  //                 <div>influence.</div>
  //               </TooltipTrigger>
  //               <TooltipContent side="top" className="bg-white rounded">
  //                 <p className="whitespace-normal">Influence rank</p>
  //               </TooltipContent>
  //             </Tooltip>
  //           </TooltipProvider>
  //         </div>
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "influence_rank_type",
  //   header: "Influence rank type",
  // },
  // {
  //   accessorKey: "creativity_rank",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         <div>
  //           <TooltipProvider delayDuration={10}>
  //             <Tooltip>
  //               <TooltipTrigger asChild className="underline decoration-dotted">
  //                 <div>Creativity.</div>
  //               </TooltipTrigger>
  //               <TooltipContent side="top" className="bg-white rounded">
  //                 <p className="whitespace-normal">Creativity rank</p>
  //               </TooltipContent>
  //             </Tooltip>
  //           </TooltipProvider>
  //         </div>
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "creativity_rank_type",
  //   header: "Creativity rank type",
  // },
  // {
  //   accessorKey: "threat_rank",
  //   header: "Threat rank",
  // },
  // {
  //   accessorKey: "threat_rank_type",
  //   header: "Threat rank type",
  // },
  // {
  //   accessorKey: "ict_index_rank",
  //   header: "ict index rank",
  // },
  // {
  //   accessorKey: "ict_index_rank_type",
  //   header: "ict_index_rank_type",
  // },
  // {
  //   accessorKey: "corners_and_indirect_freekicks_order",
  //   header: "corners_and_indirect_freekicks_order",
  // },
  // {
  //   accessorKey: "corners_and_indirect_freekicks_text",
  //   header: "corners_and_indirect_freekicks_text",
  // },
  // {
  //   accessorKey: "direct_freekicks_order",
  //   header: "direct_freekicks_order",
  // },
  // {
  //   accessorKey: "direct_freekicks_text",
  //   header: "direct_freekicks_text",
  // },
  // {
  //   accessorKey: "penalties_order",
  //   header: "penalties_order",
  // },
  // {
  //   accessorKey: "penalties_text",
  //   header: "penalties_text",
  // },
  // {
  //   accessorKey: "saves_per_90",
  //   header: "Saves per 90",
  // },
  // {
  //   accessorKey: "now_cost_rank",
  //   header: "now_cost_rank",
  // },
  // {
  //   accessorKey: "now_cost_rank_type",
  //   header: "now_cost_rank_type",
  // },
  // {
  //   accessorKey: "form_rank",
  //   header: "form_rank",
  // },
  // {
  //   accessorKey: "form_rank_type",
  //   header: "form_rank_type",
  // },
  // {
  //   accessorKey: "points_per_game_rank",
  //   header: "points_per_game_rank",
  // },
  // {
  //   accessorKey: "points_per_game_rank_type",
  //   header: "points_per_game_rank_type",
  // },
  // {
  //   accessorKey: "selected_rank",
  //   header: "selected_rank",
  // },
  // {
  //   accessorKey: "selected_rank_type",
  //   header: "selected_rank_type",
  // },
  // {
  //   accessorKey: "starts_per_90",
  //   header: "starts per 90",
  // },
  // {
  //   accessorKey: "clean_sheets_per_90",
  //   header: "Clean sheets per 90",
  // },
];
