# Daemon Manual V0.1

Player reference and character builder for the Daemon Cyberpunk 5e campaign. Everything lives in `index.html` (no build step), so it can go straight onto GitHub Pages.

## What's in it
- Rules page (`#rules`) with a chapter sidebar and search. It's the official rules reference, there's no separate document. The Every Perk tables are built from the same `PERKS` data as the trees, so editing a perk updates both
- Chapters are plain HTML sections with ids starting `r-` (like `#r-reactions`), so you can link straight to one in Discord
- Your Mercs, a roster of saved characters, plus the party database tools
- Onboarding in four steps (handle, background with 2 of 3 skills, 27-point buy, review)
- Each merc has two tabs
  - Perks and skills. Level, perk points, stat increases, the six perk trees and the skill list
  - Character sheet. Handle, origin, eddies, HP and NET HP trackers, RAM tracker, primary and secondary weapon slots, inventory, cyberware slots and notes

## Rules the builder follows
- Point buy 27 points, stats 8 to 15
- Level 1 to 20. One perk point per level up (0 at level 1, 19 at level 20)
- Two stat increases at levels 4, 6, 8, 12, 14, 16 and 19, max 20 per stat
- Max RAM is 4 + INT mod + the RAM bonus of every installed cyberware
- Reactions cost 2 RAM (the Reaction button)
- Max HP is entered by hand since it's rolled. NET HP uses the same max
- Perk trees are shaped like a fork or a "W". The middle branch opens from either Rookie perk and ends at Phenom. Each Legend opens only from its own branch's Phenom

## Saving
- Mercs save automatically in the browser
- Copy save code gives a `DMN1.` code to paste into Import on another device or in Discord
- Copy for DM gives one merc as readable JSON
- Party database (on the roster) copies or downloads every merc on the device as one JSON file

## Database format (for the DM)
```json
{
  "format": "daemon-db",
  "version": 2,
  "mercs": [
    {
      "id": "keep this the same so import updates the right merc",
      "name": "Vex",
      "background": "Nomad",
      "level": 3,
      "base": {"STR": 10, "REF": 15, "BOD": 14, "INT": 12, "TEC": 12, "COO": 9},
      "asi": ["REF", "REF"],
      "unlocked": ["REF.A.r"],
      "hpMax": 24, "hp": 15, "netHp": 24, "ram": 3, "eddies": 1500,
      "eq": {"primary": "<item id>", "secondary": null},
      "inv": [{"id": "...", "name": "Unity", "type": "Weapon", "qty": 1, "stats": "2d6 pistol, Power"}],
      "cyber": [{"id": "...", "slot": "nervous", "name": "Kerenzikov", "ram": 2, "effect": "slow time on dodge"}],
      "notes": "Owes Padre 500",
      "derived": {"...": "read only summary, ignored on import"}
    }
  ]
}
```
- Item types are Weapon, Armor, Consumable, Ammo, Gear and Cyberware. New items can leave out `id` and one will be made
- Cyberware slots are `os`, `cortex`, `ocular`, `circ`, `immune`, `nervous`, `integ`, `skeleton`, `hands`, `arms`, `legs`
- Importing a database replaces any merc with a matching `id` and adds the rest
- `hp`, `netHp` or `ram` set to `null` means full

## Live sessions (Firebase)
- Project `daemonmanual`, Firestore plus Anonymous sign-in. Config is in `FIREBASE_CONFIG` in the script
- Security rules are in `firestore.rules`. Paste them into Firestore > Rules and hit Publish
- Live sessions only work from a web address (GitHub Pages, or a local server like `py -m http.server 8000` then http://localhost:8000). Opening the file directly still works for everything else
- DM hosts and gets a 6 character code. Players join with the code and pick a merc
- Players own their merc. Their sheet syncs to the DM about half a second after any change
- The DM never edits a merc directly. Items, eddies, damage, healing and RAM restores go into the player's inbox and the player's page applies them, so nothing gets overwritten
- Sessions work like a campaign. They stay open week to week until the DM hits End session
- Disconnect keeps a player's merc in the party (shown offline). Next week they hit Rejoin. Leave party removes them
- Anything the DM sends while a player is offline lands on their sheet when they reconnect
- New device? Enter the code and hit Restore to pull your merc (and portrait) from the session. The DM's dashboard drops the old copy on its own
- Players see a live party view with everyone's portrait, HP, NET HP, RAM, eddies, weapons and items
- Portraits are cropped to 256x256 JPEGs and stored in Firestore (no Firebase Storage needed, so it stays on the free plan)
- The DM's item library lives under that browser's DM account and carries between sessions. Copy library and Import library move it to another browser
- Firestore layout
  - `sessions/{code}` holds dmUid, name, created
  - `sessions/{code}/players/{uid}` holds name, mercId, merc, updatedAt, seen (heartbeat every minute)
  - `sessions/{code}/players/{uid}/inbox/{op}` holds kind (item, eddies, hp, ram), amount or item, at
  - `sessions/{code}/portraits/{uid}` holds img (data URL) and mercId
  - `dms/{uid}/library/{item}` holds name, type, qty, stats

## Updating perks
Edit the `PERKS` object in the script. Any slot left out shows as Classified.
Slots are `A.r`, `B.r`, `A.p`, `S.p`, `B.p`, `A.ph`, `S.ph`, `B.ph`, `A.l`, `B.l`
(A and B are the outer branches, S is the middle). Branch names are in `STATS`, connections in `SLOTS`.
Cyberware slot names and counts are in `CYBER_SLOTS`.
