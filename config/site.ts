export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CampChain : A Web3 Milestone Donations Platform",
  description: "A Web3 Milestone Donations Platform",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Campaigns",
      href: "/campaigns",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/profile",
    },
    {
      label: "Campaigns",
      href: "/campaigns",
    },
    {
      label: "",
      href: "/dashboard",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
  },
};
