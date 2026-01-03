import {
  ChessKnight,
  Map,
  ScanSearch,
  Shirt,
  PaintBucket,
  Type,
  Medal,
} from "lucide-react";

export const LIST_SIDEBAR = [
  {
    icon: Map,
    path: "/atlas",
    label: "Atlas",
  },
  {
    icon: ChessKnight,
    path: "/arena",
    label: "Arena",
  },
  {
    icon: ScanSearch,
    path: "/lens",
    label: "Lens",
  },
  {
    icon: Shirt,
    label: "Batik",
    children: [
      {
        icon: PaintBucket,
        path: "/batik/buat",
        label: "Buat Batik",
      },
      {
        icon: PaintBucket,
        path: "/batik/mockup",
        label: "Mockup Batik",
      },
    ],
  },
  {
    icon: Type,
    path: "/aksara",
    label: "Aksara",
  },
  {
    icon: Medal,
    path: "/leaderboard",
    label: "Leaderboard",
  },
];
