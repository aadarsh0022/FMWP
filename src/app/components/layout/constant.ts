import {
  Home,
  Plus,
  CreditCard,
  Target,
  FileText,
  Settings,
  CreditCardIcon,
} from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    id: "budget",
    label: "Budget",
    icon: CreditCardIcon,
    children: [
      {
        id: "transactions",
        label: "Transactions",
        icon: Plus,
        href: "/dashboard/transactions",
      },
      {
        id: "budget",
        label: "Budget",
        icon: CreditCard,
        href: "/dashboard/budget",
      },
      {
        id: "goals",
        label: "Goals",
        icon: Target,
        href: "/dashboard/goals",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];
