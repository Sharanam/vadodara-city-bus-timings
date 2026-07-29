# Vadodara City Bus Timings

Live at **[sharanam.github.io/vadodara-city-bus-timings](https://sharanam.github.io/vadodara-city-bus-timings/)**.

A small static site listing timings for a handful of Vadodara City Bus Service
routes (operated under Vadodara Municipal Corporation by VITCOS). Hosted for
free on GitHub Pages.

Schedules were collected in person at the depot inquiry desk, so treat this as
a community reference, not an official publication — always confirm at the
depot before travelling.

## Features

- Static JSON data source (`data/routes.json`) that anyone can send a pull
  request against as trip timings change.
- Buses that have already departed today are hidden by default, except the
  most recent one, which is still assumed to be en route.
- A "Show previous buses" toggle to reveal the full day's schedule; the
  choice is remembered per browser.
- Star routes as favourites, and a "Favourites only" toggle to filter the
  list down to them; both are remembered per browser.
- Hovering (or focusing) a bus time shows how long until it departs, or how
  long ago it left, computed live at the moment you hover. On touch devices,
  which can't hover, tapping a time shows the same info as a toast instead
  (only one toast at a time).
- Light / dark / system theme picker, also remembered per browser.
- Footer shows when the schedule data was last updated (`meta.lastUpdated` in
  `data/routes.json`), plus Terms of Use and Legal & Privacy pages.
- No build step, no framework, no dependencies.

## Deploying to GitHub Pages

Deployed via **Settings → Pages → Deploy from a branch** on `master`, `/
(root)`. No build step — the site is plain HTML/CSS/JS, so pushing to
`master` is all a redeploy takes.

## Contributing

The schedule data is the only thing meant to change here — see
[CONTRIBUTING.md](CONTRIBUTING.md) for how to add or correct a route.

## License

[MIT](LICENSE) — reuse, modify, or redistribute freely. That includes the
schedule data: you're free to fetch [`data/routes.json`](data/routes.json)
straight from GitHub for your own app instead of hosting your own copy, e.g.
via jsDelivr:

```
https://cdn.jsdelivr.net/gh/Sharanam/vadodara-city-bus-timings@master/data/routes.json
```
