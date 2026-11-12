# Daemon Manual V0.77

Player reference and character builder for the Daemon Cyberpunk 5e campaign. Everything lives in `index.html` (no build step), so it can go straight onto GitHub Pages.

## What's in it
- Rules page (`#rules`) with a chapter sidebar and search. It's the official rules reference, there's no separate document. The Every Perk tables are built from the same `PERKS` data as the trees, so editing a perk updates both
- Chapters are plain HTML sections with ids starting `r-` (like `#r-reactions`), so you can link straight to one in Discord
- Your Mercs, a roster of saved characters, plus the party database tools
- Onboarding in five steps (handle, background with 2 of 3 skills, role, 27-point buy, review). Role gives two skill proficiencies (`ROLES` in the script) and locks once picked. Older mercs without a role get one pick on the sheet
- Each merc has two tabs
  - Perks and skills. Level, perk points, stat increases, the six perk trees and the skill list
  - Character sheet. Handle, origin, eddies, HP and NET HP trackers, RAM tracker, primary and secondary weapon slots, inventory, cyberware slots and notes

## Rules the builder follows
- Point buy 27 points, stats 8 to 15
- Level 1 to 20. One perk point per level up (0 at level 1, 19 at level 20)
- Two stat increases at levels 4, 6, 8, 12, 14, 16 and 19, max 20 per stat
- Max RAM is 4 + INT mod + the RAM bonus of every installed cyberware
- Reactions cost 2 RAM (the Reaction button)
- HP. Level 1 is 10 + 10 + BOD mod and is set automatically on a new merc. Every level after adds 10 + 1d10 + BOD mod. After a level up the sheet asks for the d10 roll (or rolls it). `hpLv` tracks which levels have had HP added. NET HP uses the same max
- Perk trees are shaped like a fork or a "W". The middle branch opens from either Rookie perk and ends at Phenom. Each Legend opens only from its own branch's Phenom

## Settings
- The SETTINGS button (bottom right, next to SFX and FX) opens the settings panel. Saved per device in `daemon-theme`
- Four animated backgrounds. Circuit (the original), Nomad (sunset desert with drifting dunes, blowing dust and drifter headlights on the far ridge), Corpo (glass shards on an angular grid with light sweeps and data blips) and Streetkid (Night City skyline in the rain with flickering neon, spotlights and flying cars). Each has its own four colors, labeled for that scene, plus the six color presets. They live in `STYLES` and `SCENES` in the script. FX off freezes them. Merc Bar is a smoky dive bar with backlit bottle shelves, a ceiling fan and flickering neon

- Settings has four tabs. Look (background, colors, background brightness). Comfort (text size, compact sheet, color-blind friendly bars, reduce flashing, battery saver). Sound (volume, plus toggles for UI clicks, game sounds and big moments). Controls (keyboard shortcuts). Stored in `daemon-theme` and `daemon-prefs`, and synced through the Google account when signed in
- Themes. A fifth background, The Net (data rain, a perspective grid, an ICE wall and floating nodes). Time of day (scene default, follow the clock, dawn, day, dusk, night) and weather (scene default, clear, rain, fog, sandstorm) work on every background. Nomad gets a moon at night and a rare Badlands sandstorm that rolls through every several minutes
- Match my origin switches to the merc's Nomad, Corpo or Streetkid background when their sheet is open. React to my merc drains the color and slows everything at low HP, goes red for cyberpsychosis, green for hacks and ripples with heat when overheated
- Jack in on the NET HP track swaps to The Net until you jack out
- The DM's Party mood panel pushes a background, time and weather to everyone in the session (stored as `mood` on the session doc). Players can turn off Let the DM set the mood
- Unlockable color presets in `UNLOCKS`. Iconic Gold (any Legend perk), Veteran (level 10), Black ICE (INT Phenom perk), Cyberpsycho (any merc snaps) and Chromed Out (6 pieces of chrome). Once unlocked they stay unlocked
- Site accent recolors the cyan text, panel edges and buttons through `--cyan` and `--crgb`
- Keyboard shortcuts. 1 to 4 jump to Rules, Your Mercs, Live Session and Codex. P and C switch sheet tabs. D and H damage or heal using the amount box. R spends a Reaction. S opens settings. ? lists them all

## Merc tools
- Undo (button on the sheet or Ctrl Z) steps back through your last 30 changes. Anything the DM sends clears the undo history so players can't undo damage
- Eddies ledger on the Character sheet logs every payment in and out with a note and running balance. Got paid and Spent buttons add entries by hand
- Achievements tab with 25 achievements, progress bars and lifetime stats. They unlock on their own and show up in the activity log. Definitions live in `ACH`
- XP bar shows on the sheet once a merc has XP (5e table in `XP_TABLE`)
- Merc ID card makes a 1200x675 PNG styled to the merc's origin, with download and copy
- Print or PDF prints a clean black and white one page sheet

## DM tools
- The dashboard has four tabs. Party (party roster, encounter, progress, activity log), NPCs (master list, Black ICE, NPC generator), Items (library and generators) and Session (handouts, mood, notes, recap, backups)
- Party tab. A compact roster of every merc shows HP and NET bars, AC, RAM, COOL and status tags. An alert strip above it flags anyone down, hacked, overheated, cyberpsycho or jack-out locked, and tapping an alert opens that merc
- Tap a merc to open their controls, split into Vitals, Give, Chrome and Sheet tabs. On a tablet or laptop held sideways (900 px and wider) the roster sits on the left and the controls stay pinned on the right. On a phone the controls open right under the merc you tapped
- Party hit. Tick the boxes beside several mercs, enter an amount, then Damage, NET dmg, Net to body or Heal hits them all at once, like a grenade. Net to body is IRL HP damage from Black ICE or a Daemon, and it's halved automatically (rounded down) for anyone with Insulated Wires. End round for everyone shows while any timed status effect is running
- Players on a screen 1000 px or wider see Combat and Gear side by side on their sheet
- NPCs only reach the players' Codex once the DM hits Add to codex or Show ID card
- Party progress. Milestone levels up the whole party. Award XP to everyone or one player
- Handouts. Upload an image (compressed under 1 MB), then Show to everyone pops it up on every player's screen. Players can reopen any handout from the Live page
- Session recap turns a day's activity log into a summary to paste in Discord

## App and search
- Search everything with the Search link, / or Ctrl K. Covers rules, perks, skills, Black ICE, mercs, gear, notes, the Codex and achievements
- Installable app. `manifest.json` and `sw.js` sit next to `index.html`. Pages load network first so pushes show up right away, and everything is cached for offline. Icons go in an `icons` folder as `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` and `apple-touch-icon.png`. Bump `V` in `sw.js` to force every device to drop its old cache

## Inventory, chrome and vitals

- The backpack is a grid. Always 6 wide, with 4 rows plus the STR mod. Items have a size (`w`, `h`) and a spot (`gx`, `gy`). `gx: -1` means the floor, which makes the merc Encumbered.
- Equipped weapons, worn armor (`eq.armor`), installed chrome and vehicles don't use bag space.
- Cyberware installs onto a body map. Shards are their own item type and go in the two Shard Slots. Anyone can slot or pull a shard, and it never counts against the cyberware threshold.
- AC is 10 + REF mod + TEC mod + chrome AC (`cyber[].ac`) + temporary AC (`acTemp`).
- Death saves live in `ds: {p, f}` and `dead`. Three passes brings a merc back with 1 HP. Three fails sets `dead` and plays the afterlife screen. Healing above 0 HP resets both.
- Status effects live in `status: [{id, r, v}]`. `r` is rounds left (null means until removed) and `v` is the Exhaustion level. The DM applies them from the party card and ends rounds for everyone.

## Vehicles
- Vehicles have a Kind. Car, Bike, Water or Air (AV). It's guessed from the name and can be changed in the item editor
- The garage on the Gear tab shows what the merc drives well. No Vehicle proficiency means they pick Car or Bike. Proficiency covers Car, Bike and Water. Double proficiency adds Air
- Each vehicle is tagged Drives well (add proficiency) or Not their strength (roll without proficiency)
- The Immune chrome slot is gone. Chrome that was installed there goes back to the backpack

## Net dives
- Jacking in is saved on the merc and synced. The DM's roster and the party cards show IN THE NET, and moving around the site no longer jacks you out
- Jacking in reminds you to stay within 15 ft of the access point. Jacking out asks Safe (an ACTION and 3 RAM) or Unsafe (free, but anything not de-rezzed gets a free hit)
- A Kraken lock only blocks a Safe Jack-Out. The player can still take an Unsafe one
- Flatlining in The Net (0 NET HP) jacks the runner out automatically
- The DM's Unsafe jack-out button is for a runner who's moved past 15 ft. It jacks them out on their device and logs it as unsafe
- A runner's Net panel lists anyone else diving, in their signature color
- The Rules page has a Diving during combat section

## Cyberware deck (DM)
- The Items tab has a Cyberware deck. Add cards with + Add card (name, slot, tier, CW load, RAM bonus, effect, copies, hot-swap) or fill the Cyberware tab of the preload sheet. Tap a card to edit or delete it
- Hand out. +1 draw lets a player pull a random card. Give card hands over a specific one. Both are also on each merc's Give tab
- The player sees a face-down deck on their Party tab, taps Draw a card, and the card flips. Add to inventory puts it in their backpack as cyberware (a RipperDoc still installs it). Put it back returns it to the deck
- Every card shows art for its slot category (eye for Ocular, heart for Circulatory and so on). Deck cyberware in the backpack uses the same art
- Drawn cards leave the deck for good. The Handed out list has Back in deck to send a copy out again. Players never see how many cards are left
- The deck is saved on the DM's device. The DM's device has to be in the session for a draw to go through, otherwise the draw waits

## Encounters (DM)
- Grunts are added with a threat preset (Gonk, Ganger, Corpo Security, Elite, Boss). Each grunt gets its own HP. Presets has a button to edit, add or reset them, saved on the DM's device
- Each enemy has an amount box with Dmg and Heal (Enter also deals damage)
- The ✎ button on any enemy edits its AC, to hit, damage, attacks and HP for this encounter. NPCs in the NPC list have the same fields, or fill them from a preset
- Difficulty meter. Weighs the party's live HP, AC and equipped weapons against the enemies and rates the fight Easy, Medium, Hard or Deadly, with a suggestion to go up or down. Black ICE gets its own Net rating against the party's netrunners. Only the DM sees it, and cover and terrain aren't counted
- Saved encounters. Name and save the current encounter, then load it later (it's added to whatever is already there)
- Short rest and Long rest buttons in the Party hit box. Tap twice to confirm
  - Short rest. RAM full, heal half max HP, timed effects end
  - Long rest. HP, NET HP and RAM full, timed effects end, death saves reset. Fried processors stay
- Bring back. A merc who is Lost to cyberpsychosis or Dead shows a Bring back button at the top of their controls (tap twice). Lost mercs come back playable with their chrome, and only get lost again if their chrome load goes up. Dead mercs come back at 1 HP with death saves reset
- Undo. Most DM changes to a merc can be undone with the Undo button in the Party hit box (the last 15)

## Ammo
- The vitals bar shows ammo for the equipped primary gun with a ↻ reload button

## Activity log
- Shows the latest 40 entries, with a Show more button for older ones

## Flair
- Signature color. Each merc picks one on the Profile tab. It shows on the roster, party cards, the DM's roster and the activity log
- Low HP vision. Under a quarter HP (or Net HP) the screen edges pulse red and the vitals bar flickers. While down the screen goes nearly black and white with a heartbeat glow. Table mode keeps the red edge but stops the motion
- Jacked in. The sheet gets scanlines, terminal headings and a NET LINK tag. Net HP moves to the front of the vitals bar and the Net panel moves to the top of Combat
- Level up shows a firmware update card with what the new level gives. Tap to close. It's skipped when effects are off

## Saving
- Mercs save automatically in the browser
- Copy save code gives a `DMN1.` code to paste into Import on another device or in Discord
- Copy for DM gives one merc as readable JSON
- Party database (on the roster) copies or downloads every merc on the device as one JSON file
- Deleted mercs go to Recently deleted on the roster for 30 days, with Restore and Delete forever
- Cloud saves (optional). Sign in with Google from the roster or the Live page. It links the browser's anonymous Firebase ID to the Google account, so nothing already saved is lost. After that every merc (notes included), portrait, hosted session and joined session lives under `users/{uid}` and follows you to any device you sign in on. Newest change wins per merc
- Turn it on in Firebase under Authentication > Sign-in method > Google. Your site's domain has to be on the Authorized domains list

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
- Sessions work like a campaign. A live game stays open week to week until the DM hits Delete live game. Each night of play is numbered (`play` and `plays` on the session doc, and every log entry carries its `play` number). Close dashboard saves the current one. Reopening asks whether to continue that session or start the next, and the activity log and recap can be filtered by session
- Disconnect keeps a player's merc in the party (shown offline). Next week they hit Rejoin. Leave party removes them
- Anything the DM sends while a player is offline lands on their sheet when they reconnect
- New device? Enter the code and hit Restore to pull your merc (and portrait) from the session. The DM's dashboard drops the old copy on its own
- Activity log. Every change to a merc in a session (HP, NET HP, RAM, eddies, items, gear, perks, levels, stats, cyberware, hacks, Cool, notes) is written to `sessions/{code}/log`, newest first, grouped by day. Changes from the DM or another player are tagged. Edits made between sessions are logged when the player reconnects. The DM can filter by merc or clear it
- Party backups. The DM's page keeps a copy of every merc that plays in `dms/{uid}/party`. Send back (or Restore merc on the party card) puts a deleted merc back on the player's roster. Copy save code works for players who left the party
- Generators on the DM dashboard. NPC (random name, origin, gender and age group, each one lockable so a reroll leaves it alone, add straight to your NPCs), Weapon and Item (pick a tier and class or type, or leave them on Any). Save drops the result in the library and can hand it to a player. The tables live in `GEN` and `EFFECTS` in the script, swap them for the GM's tables when they're ready
- Item tiers. Every item is Tier 1 to 4 (`tier` 0 to 3 in the data). Tier names, buffs and effects are placeholders in `ITEM_TIERS` and show on the Rules page under Item Tiers. Fabricator upgrades raise an item one tier
- Quickhacks. The list lives in `QUICKHACKS` and fills the Quickhacks chapter. The Character sheet has a Quickhacks panel where tapping one spends its RAM (Automation takes 1 off), greys out what you can't afford and logs it for the party. The RAM Cooldown round button brings all RAM back
- Black ICE. Stats live in `BLACK_ICE` and fill the table in the Netrunning chapter. The DM's NPCs tab has an Encounter panel (kept on the DM's device under `daemon-enc`, never in the NPC list) for Black ICE, NPCs and grunts with HP counters. Send combat alert writes `combat` {at, list} to the session doc, which pops a COMBAT INCOMING overlay on players' screens and keeps an In combat bar on their sheet until End combat clears it. NPCs the party hasn't met go out as Unknown. Sent or revealed Black ICE ids go in the session's `ice` array and fill the Codex's Black ICE tab. Program art lives in `ICE_ART`. The party card has Force jack-out (Ogre) and Lock jack-out (Kraken), which go through the inbox as `jackout` and `jacklock` and show on the player's sheet
- COOL Tokens. The DM hands them out from the party card, no cap. Use on the sheet opens a picker (my roll, each party member, each Black ICE or NPC in the session, or another enemy) and adds your COO mod to that d20 roll. In a session it lands in the activity log
- Session notes for the DM, private, saved per session in `dms/{uid}/notes/{code}`
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
- Codex (`#codex`). Tabs for NPCs, Black ICE, Weapons, Vehicles, Items and Cyberware, built from NPCs the crew has met and the DM's library (anything not set to Hidden). It's cached in the browser so it works between sessions and offline
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
- Random roller tables. The DM's Items tab has Download tables (`templates/daemon-random-tables.xlsx`, the defaults) and Upload tables. Each filled tab replaces that list (Items and Tier effects per type, Odds per roll). Saved on the DM's device under `daemon-tables`, applied over `GEN`, `EFFECTS`, `HANDLES` and `TIER_WEIGHT` from a copy of the defaults (`GEN_DEF`). Custom handles go to the session doc as `handles` so players' Random button uses them
- Player layout. Your Mercs (`#mercs` roster, `#sheet` sheet) and Live Session (`#live`) are separate pages. The sheet has tabs Combat, Gear, Chrome, Perks and skills, Party and Profile (`sheetTab`). Combat, Gear, Chrome and Profile are views of `#vCS`, chosen by `data-sub` on each section. While a player is in a session, `placeLive()` moves `#liveBody` into the Party tab (`#vParty`), and the Live Session page shows a pointer to it. `#vitalsBar` is the sticky HP, Net HP, RAM and AC strip. `‹ All mercs` and the browser back button go between sheet and roster
- Table mode (`PREFS.table`, Settings > Comfort) hides the canvas, glitch layers and big flash text and puts solid backing behind panels. Tapping HP or Net HP in the vitals bar opens the quick HP pad (`#vpad`, `hitVital`). While connected to a live session the site holds a screen wake lock (`syncWake`, `PREFS.awake`)
- Phone layout. Settings opens from the ⚙ link in the top menu (`#navSet`), with quick Sound, Motion and Table mode buttons; the old floating dock is hidden. Notifications show at the top. The sheet header keeps name, level, COOL Tokens and Undo, plus a yellow note when perk points or stat increases are waiting. The level-up tiles live at the top of Perks and skills (`#lvlTiles`), and Merc ID card and Print are in Profile (`#profTools`)
