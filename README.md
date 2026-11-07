# Daemon Manual V0.72

Player reference and character builder for the Daemon Cyberpunk 5e campaign. Everything lives in `index.html` (no build step), so it can go straight onto GitHub Pages.

## What's in it
- Rules page (`#rules`) with a chapter sidebar and search. It's the official rules reference, there's no separate document. The Every Perk tables are built from the same `PERKS` data as the trees, so editing a perk updates both
- Chapters are plain HTML sections with ids starting `r-` (like `#r-reactions`), so you can link straight to one in Discord
- Your Mercs, a roster of saved characters, plus the party database tools
- Onboarding in five steps (handle, background with 2 of 3 skills, role, 27-point buy, review). Role is flavor only for now and can be changed on the sheet
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
      "role": "Netrunner",
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
- Only a merc with the TEC Legend perk RipperDoc (`TEC.B.l`) can install or remove cyberware, in themselves or (in a live session) in other players. The DM can too. The rules enforce this server-side
- Players can hand items and send eddies to each other in a live session. Everything moves through the target's inbox
- Hot-swap parts (house rule draft). A RipperDoc spends 500 €$ to make a Cyberware item hot-swappable (`hot: true`). Anyone can swap a hot part in or out of themselves for 2 RAM, but it only gives half its RAM bonus. Tweak `HOTSWAP_COST` and `HOTSWAP_RAM` in the script
- Fabrication (draft prices). Only a merc with the TEC Phenom perk Fabricator (`TEC.B.ph`) gets the Fabrication bench on the character sheet. Create 300 €$, Upgrade 200 €$ per Mk level (Mk II to Mk IV, item `tier` 1 to 3), Fortify 150 €$ (item `fort`). Tweak `FAB_COST` in the script
- Cyberpsychosis status (`psycho` on the merc). Set from the sheet (Lose it / Pull back) or by the DM from the dashboard. Turning it on glitches the whole page, then leaves a lingering vignette until it's cleared
- Hitting 0 HP or 0 NET HP plays the FLATLINED screen
- DM hacks (draft list in `HACKS`). System Lockout, Weapon Glitch, Optics Reboot, Cyberware Malfunction and Short Circuit. They stack on the merc (`hacks`), lock the matching sheet features, mark disadvantage and glitch the page until the DM clears them
- Overheated. When a merc's RAM hits 0 they're OVERHEATED (stunned) and the sheet locks every action until RAM comes back. The INT perk Insulated Wires (`INT.A.p`) makes them immune. It's worked out from RAM, nothing extra is stored
- The DM can damage or heal NET HP and drain or add RAM, not just restore it
- Cyberware threshold. Each cyberware item has a cost (`cw`), set in the DM library or by the Fabricator. Installed costs plus manual tallies (`cwAdj`) fill the tally. Threshold (`cwT`, default 10) and max (`cwMax`, default 15) are set by the DM. Each point past the threshold is +2 to the Cyberpsychosis DC, and nothing can be installed past the max
- Cool bonuses (`cool`). The DM awards them like inspiration, the player spends them from the sheet header
- NPCs. The DM keeps private NPCs (`dms/{uid}/npcs`, HP, advantage, notes, portrait). Show ID card publishes a public card to `sessions/{code}/npcs` (name, origin, portrait, critical, down) and pops it up for everyone via `spotlight` on the session doc. Under 30% HP the card shows CRITICAL, at 0 FLATLINED. Players never see HP
- Codex (`#codex`). Tabs for NPCs, Weapons, Vehicles, Items and Cyberware, built from NPCs the crew has met and the DM's library (anything not set to Hidden). It's cached in the browser so it works between sessions and offline
- The DM's item library lives under that browser's DM account and carries between sessions. Copy library and Import library move it to another browser
- Firestore layout
  - `sessions/{code}` holds dmUid, name, created
  - `sessions/{code}/players/{uid}` holds name, mercId, merc, updatedAt, seen (heartbeat every minute)
  - `sessions/{code}/players/{uid}/inbox/{op}` holds kind (item, eddies, hp, net, ram, ramDelta, cwDelta, cwSet, install, uninstall, psycho, hack, unhack, cool), amount, item, itemId, slot, cyberId, from, fromName, at
  - `sessions/{code}/portraits/{uid}` holds img (data URL) and mercId
  - `dms/{uid}/library/{item}` holds name, type, qty, stats

## Updating perks
Edit the `PERKS` object in the script. Any slot left out shows as Classified.
Slots are `A.r`, `B.r`, `A.p`, `S.p`, `B.p`, `A.ph`, `S.ph`, `B.ph`, `A.l`, `B.l`
(A and B are the outer branches, S is the middle). Branch names are in `STATS`, connections in `SLOTS`.
Cyberware slot names and counts are in `CYBER_SLOTS`.
