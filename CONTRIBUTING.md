# Contributing

The only thing that ever needs to change here is the schedule data, so that's
the only supported way to contribute: edit
[`data/routes.json`](data/routes.json) and open a pull request. No code
changes are needed.

## Data shape

Each entry in `routes` looks like this:

```json
{
  "id": "10",
  "number": "10",
  "note": null,
  "stops": ["Station", "GIDC"],
  "trips": [
    {
      "label": "Trip 1",
      "schedule": [
        ["05:40", "06:30"]
      ]
    }
  ]
}
```

- `stops` is `[origin, destination]`. Every `schedule` row is
  `[timeAtStops0, timeAtStops1]`.
- Times are 24-hour `HH:MM`, in IST — no AM/PM needed.
- `trips` groups repeating bus patterns on the same route (e.g. "Trip 1" /
  "Trip 2"). If a route only runs one pattern, use a single trip with
  `"label": null`.
- Update `meta.lastUpdated` in the same file when you change any timings, so
  readers know how fresh the schedule is.

## Guidelines

- Only submit timings you've verified yourself (at the depot, on the bus, or
  from an official source) — please don't guess.
- Keep pull requests scoped to the route(s) you're actually updating.
