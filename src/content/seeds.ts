export const noteSeed = [
  {
    title: "Chrome Web Store is the public install path",
    body: "Packaged installs should use the listing: https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok — extension id ocahgpmgfeapjnceaknkikanjikhjgok, version 1.2.0, offered by PWNX0. Source installs remain for people who need to audit or rebuild dist/.",
    tag: "RELEASE",
    author: "dossier",
    createdAt: new Date("2026-09-23T16:00:00Z"),
  },
  {
    title: "Do not collapse the listing into contract v12",
    body: "The store package is dated 2026-09-23. The status baseline audited on 2026-09-26 describes contract v12 and 81 methods at commit 4aa55ba. Say which one you mean.",
    tag: "DOCS",
    author: "dossier",
    createdAt: new Date("2026-09-26T11:30:00Z"),
  },
  {
    title: "Auto-lock wording disagrees with the source",
    body: "The Chrome Web Store overview calls the 15-minute lock an inactivity lock. The extension repository describes a fixed-period alarm. The source wins until a build changes the behavior and the listing together.",
    tag: "SECURITY",
    author: "dossier",
    createdAt: new Date("2026-09-26T12:10:00Z"),
  },
] as const;
