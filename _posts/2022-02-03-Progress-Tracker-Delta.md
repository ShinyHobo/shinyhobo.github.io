---
layout: post  
title: "Delta - 2022-02-03"  
date: 2022-02-03  
categories: Delta  
---

# Progress Report Delta #  
### 431 deliverables listed | Wed Dec 15 2021 => Wed Feb 09 2022 ###  
There were 89 modifications, 4 removals, and 15 additions (with 2 returning) in this update.  
  
---  

[4] deliverable(s) *removed*:  
* **Reward Service**  
*Last scheduled from Sun Mar 27 2022 to Wed Jul 20 2022*  
Developing and implementing back-end systems capable of tracking stats and data per player, and
awarding in-game rewards to them, as well as collecting, persisting and querying those player
rewards  
  
* **System Broadcaster**  
*Last scheduled from Sun May 08 2022 to Wed Sep 14 2022*  
Implementing a system that enables the scheduling of various types of server-wide communications to
players.  
  
* **Drake Cutlass Gold Standard**  
*Last scheduled from Sun Aug 21 2022 to Thu Sep 15 2022*  
Implementing, polishing, and optimizing all features required to bring the Drake Cutlass to gold
standard.  
  
* **Unannounced**  
*Last scheduled from Sun Apr 17 2022 to Thu Sep 15 2022*  
Unannounced Vehicle  
  
---  

[15] deliverable(s) *added*:  
* **Look IK Architecture Refactor**  
*Tue Feb 01 2022 => Mon Mar 28 2022*  
Update to the existing Look IK system to remap eye trajectory to use eye expressions that are
defined in rig logic.  
  
* **Long Term Persistence Enhancements**  
*Tue Mar 01 2022 => Mon Mar 28 2022*  
Changes to Long Term Persistence that support the new inventory and shard database. LTP
functionality will stay the same, but the system will read/write the data from the new entity graph
database.  
  
* **Reputation V2**  
*Sun Dec 26 2021 => Mon Feb 14 2022*  
An upgrade to the reputation system that allows reputation to drive AI hostility.  
  
* **Modular Shaders**  
*Mon Jan 03 2022 => Mon Mar 07 2022*  
Updating the existing shader system and its workflows to allow for implementation of support for
basic modularity.  
  
* **AI - Arcade Machine**  
*Thu Feb 03 2022 => Wed Mar 16 2022*  
AI behavior where the AI will play multiple rounds on an arcade machine, with varied emotional
results depending on if they win or lose.  
  
* **Name Resolving API**  
*Tue Feb 01 2022 => Mon Feb 28 2022*  
Engine implementation for entity class name resolving service.  
  
* **Greycat Industrial Cydnus Mining Droid**  
*Mon Jan 03 2022 => Mon Mar 28 2022*  
Building, implementing, and balancing Greycat's mining platform, the Cydnus, as a game-ready
vehicle.  
  
* **Bounty Hunter V2**  
*Tue Jan 18 2022 => Thu Aug 25 2022*  
Enabling players to track criminals via a mobiGlas security app linked to distress beacons, comm
arrays, air traffic control systems, cameras, and NPC informants. This will rely on various new
backend tech, including Virtual AI, the NPC Scheduler, and Security Service.  
  
* **DGS Crash Recovery**  
*Tue Mar 01 2022 => Thu Mar 24 2022*  
When a Dedicated Game Server (DGS) crashes, this system will spin-up a replacement DGS and restore
its state from the Replication Layer.  
  
* **AI - Usable System V2**  
*Thu Jan 06 2022 => Wed Mar 02 2022*  
Improving the implementation of the existing usable system to optimize the memory usage, and improve
the performance when querying usable data at runtime.   
  
* **Argo SRV**  
*Sun Apr 17 2022 => Thu Sep 15 2022*  
Building, implementing, and balancing Argo's tugboat, the SRV, as a game-ready vehicle.  
  
* **Server Streaming**  
*Mon Jan 03 2022 => Mon Feb 14 2022*  
Changes the implementation of Server Object Container Streaming (S-OCS) to be driven from the
network code's Replication Layer, backed by EntityGraph for persistent storage.  
  
* **Military Multi-Tool**  
*Sun Jan 09 2022 => Thu Feb 03 2022*  
Designing and building a multi-tool variant used by the UEE Military in the Squadron 42 campaign.  
  
* **Hospital Surgeon**  
*Sun Jan 02 2022 => Thu Feb 24 2022*  
Concepting, creating, and implementing the outfits worn by surgeons, beginning with the ones working
in the Orison General hospital location.  
  
* **Wheeled Vehicle Physics Improvements**  
*Mon Sep 27 2021 => Sun Nov 28 2021*  
Improving physics for ground vehicles by taking static environment and collisions into account
during network prediction and synchronization.  
  
---  

[89] deliverable(s) *updated*:  
**Fire Extinguisher**  
*Sat Jan 15 2022 => Thu Mar 17 2022*  
* Start date has been corrected from Mon Jan 03 2022 to Sat Jan 15 2022  
* End date has been extended from Thu Feb 17 2022 to Thu Mar 17 2022  
  
**Drake Vulture**  
*Sun May 30 2021 => Sun Apr 03 2022*  
* End date has been extended from Mon Mar 14 2022 to Sun Apr 03 2022  
  
![](https://robertsspaceindustries.com/media/uf5rt7vyvbtxdr/source/DRAK_Vulture_Promo_Extra_InFlight_AA02_Grade01-Squashed.jpg)  
<sup>Release 3.18</sup>  

**MISC Hull C**  
*Sun Mar 07 2021 => Thu Jun 02 2022*  
* End date has been extended from Thu Dec 16 2021 to Thu Jun 02 2022  
  
**DNA Head Textures Update**  
*Sun Oct 10 2021 => Thu Mar 24 2022*  
* End date has been extended from Thu Dec 02 2021 to Thu Mar 24 2022  
  
![](https://robertsspaceindustries.com/media/e3omos8kevwb3r/source/Dnaroadmap.png)  
<sup>Release 3.17</sup>  

**Salvage T0**  
*Mon Apr 19 2021 => Sun Apr 03 2022*  
* End date has been extended from Mon Mar 28 2022 to Sun Apr 03 2022  
  
![](https://robertsspaceindustries.com/media/ydhforz0nhexyr/source/DRAK_Vulture_Promo_JunkYard_AA01_Grade01-Squashed.jpg)  
<sup>Release 3.18</sup>  

**FS-Tech-Anim - Asset Integration**  
*Mon Apr 26 2021 => Mon Jan 31 2022*  
* End date has been extended from Tue Dec 21 2021 to Mon Jan 31 2022  
  
**MISC Hull A**  
*Sun Jun 27 2021 => Thu Mar 17 2022*  
* End date has been extended from Mon Feb 14 2022 to Thu Mar 17 2022  
  
![](https://robertsspaceindustries.com/media/o166pcqzmxrhzr/source/Hull_A_1_v002_compflat.jpg)  
<sup>Release 3.17</sup>  

**Gen12 - Renderer T1**  
*Sun Jan 03 2021 => Mon Mar 07 2022*  
* End date has been extended from Mon Jan 31 2022 to Mon Mar 07 2022  
  
**Greycat Industrial Tractor Tool**  
*Sun Mar 14 2021 => Thu Mar 03 2022*  
* End date has been extended from Thu Dec 16 2021 to Thu Mar 03 2022  
  
**Bombs**  
*Tue Jan 05 2021 => Thu Mar 03 2022*  
* End date has been extended from Sun Nov 14 2021 to Thu Mar 03 2022  
  
![](https://robertsspaceindustries.com/media/z4lsu1gi1ixaqr/source/CRUS_Starlifter_Promo_MOAB_SM01_PJ01_Grade-Squashed.jpg)  
<sup>Release 3.15</sup>  

**Persistent Hangars**  
*Sun May 09 2021 => Thu Aug 25 2022*  
* End date has been extended from Thu Dec 02 2021 to Thu Aug 25 2022  
  
**Cargo System Refactor**  
*Sun Jan 03 2021 => Thu Jun 02 2022*  
* End date has been extended from Mon Feb 28 2022 to Thu Jun 02 2022  
  
![](https://robertsspaceindustries.com/media/bu2rlurxhhh4gr/source/Titan_10.jpg)  
<sup>Release 3.18</sup>  

**Login Flow**  
*Tue Aug 17 2021 => Thu Jun 30 2022*  
* End date has been extended from Tue Mar 15 2022 to Thu Jun 30 2022  
  
**Gravlev Physics Rework**  
*Fri Oct 15 2021 => Thu Jan 20 2022*  
* End date has been extended from Thu Nov 25 2021 to Thu Jan 20 2022  
  
![](https://robertsspaceindustries.com/media/g2qv2toyodxhdr/source/Gravlev.jpg)  
<sup>Release 3.16</sup>  

**Enemy Ships**  
*Sun Jan 03 2021 => Sun Feb 20 2022*  
* End date has been extended from Thu Jul 08 2021 to Sun Feb 20 2022  
  
**Spectrum Party Sync**  
*Tue Aug 31 2021 => Mon Sep 27 2021*  
* End date has moved earlier (time allocation removal(s) likely)  
 from Wed Aug 17 2022 to Mon Sep 27 2021  
  
**Origin X1**  
*Sun Jan 30 2022 => Thu Jul 07 2022*  
* End date has been extended from Thu Jun 23 2022 to Thu Jul 07 2022  
  
**Shops and Patrons**  
*Thu Mar 25 2021 => Wed Feb 16 2022*  
* End date has been extended from Wed Dec 01 2021 to Wed Feb 16 2022  
  
**Error Reporting & Crash Handling**  
*Tue Jan 05 2021 => Tue Mar 29 2022*  
* End date has moved closer from Wed Sep 28 2022 to Tue Mar 29 2022  
  
**AI - Landing Improvements**  
*Thu Oct 07 2021 => Wed Feb 16 2022*  
* End date has been extended from Wed Nov 17 2021 to Wed Feb 16 2022  
  
**Commodity Kiosk**  
*Sun Jan 17 2021 => Thu Apr 07 2022*  
* End date has been extended from Mon Feb 28 2022 to Thu Apr 07 2022  
  
**Aegis Retaliator Gold Standard**  
*Sun Jan 03 2021 => Thu Jul 01 2021*  
* End date has moved earlier (time allocation removal(s) likely)  
 from Thu Aug 11 2022 to Thu Jul 01 2021  
  
**Dynamic Events**  
*Sun Jan 03 2021 => Thu Aug 25 2022*  
* End date has been extended from Mon Feb 28 2022 to Thu Aug 25 2022  
  
**Enemy Characters**  
*Thu Mar 25 2021 => Thu Mar 24 2022*  
* End date has been extended from Thu Dec 02 2021 to Thu Mar 24 2022  
  
**Animatable Gunner Helmet**  
*Sun Jun 06 2021 => Thu Mar 24 2022*  
* End date has been extended from Thu Nov 18 2021 to Thu Mar 24 2022  
  
**Female Player Head**  
*Sun Aug 01 2021 => Mon Feb 14 2022*  
* End date has been extended from Thu Nov 18 2021 to Mon Feb 14 2022  
  
**Frontier Clothing**  
*Sun Aug 15 2021 => Thu Mar 24 2022*  
* End date has been extended from Thu Dec 30 2021 to Thu Mar 24 2022  
  
**Greycat Industrial Salvage Backpack**  
*Sun Dec 19 2021 => Thu Feb 24 2022*  
* End date has been extended from Thu Dec 30 2021 to Thu Feb 24 2022  
  
**XenoThreat Armor**  
*Sun Oct 10 2021 => Thu Mar 24 2022*  
* End date has been extended from Thu Dec 30 2021 to Thu Mar 24 2022  
  
**Healing T0 / Actor Status T1**  
*Sun Jan 03 2021 => Mon Mar 14 2022*  
* End date has been extended from Thu Dec 30 2021 to Mon Mar 14 2022  
  
![](https://robertsspaceindustries.com/media/2hz4a8eq3ttjkr/source/DRAKE_CutlassRed_MedBed_012020-Min.jpg)  
<sup>Release 3.15</sup>  

**Chapter 27**  
*Sun Jan 31 2021 => Thu Dec 30 2021*  
* End date has moved earlier (time allocation removal(s) likely)  
 from Mon Mar 28 2022 to Thu Dec 30 2021  
  
**Hybrid Service**  
*Sun May 09 2021 => Mon Feb 14 2022*  
* End date has been extended from Thu Dec 02 2021 to Mon Feb 14 2022  
  
**Outlaw Medical Outfits**  
*Sun Oct 10 2021 => Thu Feb 03 2022*  
* End date has been extended from Thu Nov 04 2021 to Thu Feb 03 2022  
  
**Character Work**  
*Thu Mar 25 2021 => Mon Mar 28 2022*  
* End date has been extended from Thu Dec 30 2021 to Mon Mar 28 2022  
  
**Lorville - Hospital Interior Location**  
*Tue Feb 16 2021 => Thu Mar 10 2022*  
* End date has been extended from Wed Dec 22 2021 to Thu Mar 10 2022  
  
![](https://robertsspaceindustries.com/media/5qhq6xrt0pqzcr/source/MPoH.png)  
<sup>Release 3.17</sup>  

**Jump Point Spacescaping**  
*Mon Mar 08 2021 => Mon Jan 31 2022*  
* End date has been extended from Thu Oct 28 2021 to Mon Jan 31 2022  
  
**Chapter 19**  
*Thu Dec 31 2020 => Mon Mar 14 2022*  
* End date has been extended from Thu Dec 30 2021 to Mon Mar 14 2022  
  
**Civilian NPC Movement Improvements**  
*Thu Jul 01 2021 => Wed Mar 02 2022*  
* End date has been extended from Wed Dec 01 2021 to Wed Mar 02 2022  
  
**Improved OC Workflow**  
*Tue Jan 05 2021 => Mon Mar 14 2022*  
* End date has been extended from Tue Dec 07 2021 to Mon Mar 14 2022  
  
**Atlas**  
*Fri Jul 02 2021 => Mon Feb 28 2022*  
* End date has been extended from Thu Nov 04 2021 to Mon Feb 28 2022  
  
**ECUS Improvements**  
*Sun Jan 03 2021 => Mon Feb 28 2022*  
* End date has been extended from Thu Nov 25 2021 to Mon Feb 28 2022  
  
**Entity Stow/Destroy**  
*Fri Jul 02 2021 => Mon Feb 14 2022*  
* End date has been extended from Thu Nov 18 2021 to Mon Feb 14 2022  
  
**VisArea Improvements**  
*Sun Jan 03 2021 => Mon Feb 28 2022*  
* End date has been extended from Thu Nov 25 2021 to Mon Feb 28 2022  
  
**Chapter 05**  
*Thu Dec 31 2020 => Thu Dec 30 2021*  
* End date has moved earlier (time allocation removal(s) likely)  
 from Thu May 05 2022 to Thu Dec 30 2021  
  
**Subsumption Editor Integration**  
*Thu Mar 25 2021 => Wed Mar 16 2022*  
* End date has been extended from Wed Nov 17 2021 to Wed Mar 16 2022  
  
**Player Item Shard Transition**  
*Tue Sep 28 2021 => Mon Mar 14 2022*  
* End date has been extended from Mon Oct 25 2021 to Mon Mar 14 2022  
  
**Asset Reference Database**  
*Tue Jan 05 2021 => Mon Mar 14 2022*  
* End date has been extended from Tue Dec 07 2021 to Mon Mar 14 2022  
  
**Chapter 23**  
*Fri Apr 30 2021 => Mon Mar 14 2022*  
* End date has been extended from Thu Dec 30 2021 to Mon Mar 14 2022  
  
**Fire Hazard**  
*Mon Mar 29 2021 => Sun Mar 13 2022*  
* End date has been extended from Sun Nov 14 2021 to Sun Mar 13 2022  
  
**AI - Untrained Combat**  
*Thu Mar 25 2021 => Wed Mar 16 2022*  
* End date has been extended from Wed Nov 17 2021 to Wed Mar 16 2022  
  
**AI - Navigation Links - Ladders/Ledge Grab**  
*Thu Aug 12 2021 => Wed Feb 16 2022*  
* End date has been extended from Wed Nov 03 2021 to Wed Feb 16 2022  
  
**Rescue/Transport Mission**  
*Mon May 31 2021 => Thu Jan 20 2022*  
* End date has been extended from Thu Dec 30 2021 to Thu Jan 20 2022  
  
**Aciedo Station**  
*Sun Feb 28 2021 => Thu Feb 03 2022*  
* End date has been extended from Wed Dec 01 2021 to Thu Feb 03 2022  
  
**StarWords Improvements**  
*Wed Mar 31 2021 => Mon Mar 14 2022*  
* End date has been extended from Tue Oct 26 2021 to Mon Mar 14 2022  
  
**Replication Layer Entity Authority**  
*Sun Apr 25 2021 => Mon Feb 28 2022*  
* End date has been extended from Thu Dec 02 2021 to Mon Feb 28 2022  
  
**DGS Mesh Node**  
*Sun Aug 01 2021 => Thu Mar 24 2022*  
* End date has been extended from Thu Dec 02 2021 to Thu Mar 24 2022  
  
**Greycat Industrial Salvage Tool**  
*Sun Apr 04 2021 => Thu Mar 03 2022*  
* End date has been extended from Thu Dec 09 2021 to Thu Mar 03 2022  
  
**Security Behavior**  
*Thu Mar 25 2021 => Wed Feb 02 2022*  
* End date has been extended from Wed Nov 03 2021 to Wed Feb 02 2022  
  
**Chapter 01**  
*Thu Dec 31 2020 => Fri Jan 14 2022*  
* End date has been extended from Thu Dec 30 2021 to Fri Jan 14 2022  
  
**Levski - Hospital Interior Location**  
*Tue Feb 16 2021 => Sun Mar 13 2022*  
* End date has been extended from Mon Feb 14 2022 to Sun Mar 13 2022  
  
**Lean Over Cover**  
*Sun Apr 03 2022 => Thu Jul 07 2022*  
* Start date has moved closer from Sun May 15 2022 to Sun Apr 03 2022  
  
**Breakers Yard**  
*Sun Jan 03 2021 => Mon Mar 28 2022*  
* End date has been extended from Thu Dec 30 2021 to Mon Mar 28 2022  
  
**Chemline**  
*Sun Jan 03 2021 => Mon Mar 28 2022*  
* End date has moved closer from Thu May 05 2022 to Mon Mar 28 2022  
  
**Chapter 10**  
*Tue Jan 05 2021 => Wed Mar 30 2022*  
* End date has been extended from Thu Dec 30 2021 to Wed Mar 30 2022  
  
**Chapter 26**  
*Thu Dec 31 2020 => Mon Mar 28 2022*  
* End date has moved closer from Thu May 05 2022 to Mon Mar 28 2022  
  
**Identity Service**  
*Tue Dec 07 2021 => Mon Dec 20 2021*  
* End date has moved earlier (time allocation removal(s) likely)  
 from Thu Jun 30 2022 to Mon Dec 20 2021  
  
**Chapter 08**  
*Thu Dec 31 2020 => Wed Mar 30 2022*  
* End date has been extended from Thu Dec 30 2021 to Wed Mar 30 2022  
  
**Pyro System, Planet, and Mission Setup**  
*Sun Jan 03 2021 => Thu Aug 25 2022*  
* End date has been extended from Mon Feb 14 2022 to Thu Aug 25 2022  
  
**Chapter 06**  
*Thu Dec 31 2020 => Wed Mar 30 2022*  
* End date has been extended from Thu Dec 30 2021 to Wed Mar 30 2022  
  
**Chapter 21**  
*Sun May 30 2021 => Mon Mar 14 2022*  
* End date has been extended from Thu Dec 30 2021 to Mon Mar 14 2022  
  
**AI - Planetary Navigation**  
*Thu May 06 2021 => Wed Jan 19 2022*  
* End date has been extended from Wed Sep 08 2021 to Wed Jan 19 2022  
  
**Spacescaping**  
*Wed Jun 30 2021 => Mon Mar 28 2022*  
* End date has moved closer from Thu May 05 2022 to Mon Mar 28 2022  
  
**Tracking App**  
*Mon Jan 11 2021 => Sun Aug 22 2021*  
* End date has moved earlier (time allocation removal(s) likely)  
 from Thu May 19 2022 to Sun Aug 22 2021  
  
**HEX**  
*Tue Jan 05 2021 => Wed Sep 28 2022*  
* End date has been extended from Thu Jun 30 2022 to Wed Sep 28 2022  
  
**Mission Manager App**  
*Sun Jul 03 2022 => Thu Aug 25 2022*  
* Start date has pushed back from Tue Mar 29 2022 to Sun Jul 03 2022  
* End date has been extended from Thu May 19 2022 to Thu Aug 25 2022  
  
**Vending Machine Utilization T0**  
*Wed Apr 14 2021 => Wed Feb 16 2022*  
* End date has been extended from Tue Apr 27 2021 to Wed Feb 16 2022  
  
**Maya Loadouts from P4K**  
*Mon Jun 07 2021 => Mon Jan 31 2022*  
* End date has been extended from Sun Jun 20 2021 to Mon Jan 31 2022  
  
**Chapter 12**  
*Tue Jan 05 2021 => Sun Feb 27 2022*  
* End date has been extended from Thu Dec 30 2021 to Sun Feb 27 2022  
  
**Chapter 15**  
*Thu Dec 31 2020 => Wed Mar 30 2022*  
* End date has been extended from Thu Dec 30 2021 to Wed Mar 30 2022  
  
**NPC Tracker Service**  
*Sun Jan 31 2021 => Mon Jan 17 2022*  
* End date has been extended from Thu Dec 30 2021 to Mon Jan 17 2022  
  
**Xi'an Cargo**  
*Sun May 30 2021 => Thu Dec 30 2021*  
* End date has moved earlier (time allocation removal(s) likely)  
 from Thu May 05 2022 to Thu Dec 30 2021  
  
**Chapter 04**  
*Thu Dec 31 2020 => Sun Jan 30 2022*  
* End date has been extended from Thu Dec 30 2021 to Sun Jan 30 2022  
  
**Chapter 18**  
*Thu Dec 31 2020 => Sun Feb 27 2022*  
* End date has been extended from Thu Dec 30 2021 to Sun Feb 27 2022  
  
**Unannounced (Unannounced Vehicle)**  
*Sun Jan 02 2022 => Thu Jun 02 2022*  
* Start date has been corrected from Sun Jan 16 2022 to Sun Jan 02 2022  
* End date has been extended from Thu Mar 24 2022 to Thu Jun 02 2022  
  
**Unannounced (Unannounced Vehicle)**  
*Sun Apr 24 2022 => Thu Jun 23 2022*  
* Start date has pushed back from Sun Apr 03 2022 to Sun Apr 24 2022  
  
**Unannounced (Unannounced Tech)**  
*Tue Aug 31 2021 => Tue Feb 01 2022*  
* End date has been extended from Tue Jan 18 2022 to Tue Feb 01 2022  
  
**Unannounced (Unannounced Content)**  
*Mon Jul 05 2021 => Mon Aug 30 2021*  
* End date has moved earlier (time allocation removal(s) likely)  
 from Thu Feb 17 2022 to Mon Aug 30 2021  
  
**Unannounced (Unannounced Vehicle)**  
*Sun Jun 27 2021 => Thu Dec 16 2021*  
* Title has been updated from "Unannounced" to "Drake Cutlass Steel"  
* Description has been updated from  
"Unannounced Vehicle"  
to  
"Building, implementing, and balancing Drake Interplanetary's dropship, the Cutlass Steel, as a
game-ready vehicle."  
  
**Unannounced (Unannounced Vehicle)**  
*Sun Apr 11 2021 => Mon Feb 14 2022*  
* Title has been updated from "Unannounced" to "Consolidated Outland HoverQuad"  
* Description has been updated from  
"Unannounced Vehicle"  
to  
"Building, implementing, and balancing Consolidated Outland's gravlev bike, the HoverQuad, as a
game-ready vehicle."  
  
[331] deliverable(s) *unchanged*  

---  

## This section lists all currently scheduled deliverable time allocations. Any given item is assigned
to either Star Citizen (SC), Squadron 42 (SQ42), or both, and the teams that work on each
deliverable can be split between many tasks (marked with {PT} for part time). ##  
  
## There are currently 95 scheduled tasks being done by 41 teams: ##  
  
**AI - Arcade Machine** [SC, SQ42]  
* AI Content Team (AIC) until Wed Mar 16 2022 {PT}  
  
**AI - Landing Improvements** [SC]  
* AI Tech and Feature Team (AITF) until Wed Feb 16 2022   
  
**AI - Navigation Links - Ladders/Ledge Grab** [SC, SQ42]  
* AI Tech and Feature Team (AITF) until Wed Feb 16 2022   
  
**AI - Untrained Combat** [SC, SQ42]  
* AI Tech and Feature Team (AITF) until Wed Mar 16 2022   
  
**AI - Usable System V2** [SC]  
* AI Tech and Feature Team (AITF) until Wed Mar 02 2022 {PT}  
  
**Archon** [SQ42]  
* SQ42 Art (S42A) until Mon Mar 28 2022   
  
**Atlas** [SC]  
* Network Team (NET) until Mon Feb 28 2022   
  
**Atmospheric Pressure Damage** [SC]  
* EU PU Gameplay Feature Team (EUPU) until Mon Feb 28 2022   
  
**Banu Merchantman** [SC]  
* Vehicle Content - EU (EUVC) until Thu Feb 10 2022   
* Vehicle Concept Art (VCA) until Thu Feb 10 2022   
  
**Bounty Hunter V2** [SC]  
* US PU Gameplay Feature Team (USPU) until Mon Feb 14 2022   
  
**Breakers Yard** [SQ42]  
* SQ42 Art (S42A) until Mon Mar 28 2022   
  
**Bug Fixing & Tech Debt** [SC, SQ42]  
* Character Tech Art (CTA) until Thu Feb 10 2022   
* Tools Team (DVT) until Mon Mar 28 2022   
* Network Team (NET) until Mon Mar 14 2022   
* Weapon Content Team (WCT) until Thu Feb 10 2022   
* Vehicle Tech Team (VTT) until Thu Feb 17 2022 {PT}  
* Actor Tech Team (ATT) until Thu Mar 31 2022   
* Editor Team (EDIT) until Mon Feb 14 2022   
* Engine Team (ENG) until Mon Mar 28 2022   
* Vehicle Feature Team (VFT) until Mon Feb 28 2022   
  
**Building Interiors** [SC]  
* MTL Sandbox 1 (MTLSB) #0 until Mon Mar 14 2022 {PT}  
* MTL Sandbox 1 (MTLSB) #1 until Thu Apr 07 2022 {PT}  
* MTL Sandbox 1 (MTLSB) #2 until Thu Apr 21 2022 {PT}  
  
**Cargo System Refactor** [SC]  
* Props Team (PROPS) until Sat Feb 19 2022   
* US PU Gameplay Feature Team (USPU) until Mon Mar 28 2022 {PT}  
  
**Chapter 06** [SQ42]  
* Gameplay Story (GPS) until Sun Feb 13 2022 {PT}  
  
**Chapter 08** [SQ42]  
* Gameplay Story (GPS) until Sun Feb 13 2022 {PT}  
  
**Chapter 10** [SQ42]  
* Gameplay Story (GPS) until Sun Feb 13 2022 {PT}  
  
**Chapter 26** [SQ42]  
* SQ42 Art (S42A) until Mon Mar 28 2022   
  
**Character Work** [SQ42]  
* AI Content Team (AIC) until Wed Mar 16 2022   
* AI Tech and Feature Team (AITF) until Wed Mar 02 2022   
* Motion Capture Team (MOCAP) until Mon Feb 14 2022   
* Audio (AUDIO) until Thu Feb 10 2022 {PT}  
* Character Tech Art (CTA) until Thu Feb 10 2022   
* SQ42 Character Art (S42CA) until Thu Feb 10 2022   
* Tech Animation Team (TAN) until Mon Mar 28 2022 {PT}  
  
**Chemline** [SQ42]  
* SQ42 Art (S42A) until Mon Mar 28 2022   
* VFX Team (VFX) until Sun Mar 13 2022   
  
**Civilian NPC Movement Improvements** [SC]  
* AI Tech and Feature Team (AITF) until Wed Mar 02 2022 {PT}  
  
**Commodity Kiosk** [SC]  
* US PU Gameplay Feature Team (USPU) until Mon Feb 28 2022 {PT}  
  
**Consolidated Outland HoverQuad** [SC]  
* Vehicle Experience Team (VET) until Mon Feb 14 2022   
  
**Derelict Spaceships - Points of Interest** [SC]  
* MTL Sandbox 1 (MTLSB) #0 until Mon Mar 14 2022 {PT}  
* MTL Sandbox 1 (MTLSB) #1 until Thu Apr 07 2022 {PT}  
* MTL Sandbox 1 (MTLSB) #2 until Thu Apr 21 2022 {PT}  
  
**Drake Corsair** [SC]  
* Vehicle Content - US (USVC) until Thu Feb 17 2022   
  
**Drake Vulture** [SC]  
* Vehicle Content - US (USVC) until Thu Feb 17 2022   
  
**Dynamic Events** [SC]  
* US PU Gameplay Feature Team (USPU) until Mon Feb 28 2022 {PT}  
  
**ECUS Improvements** [SC, SQ42]  
* Engine Team (ENG) until Mon Feb 28 2022 {PT}  
  
**Enemy Characters** [SQ42]  
* AI Tech and Feature Team (AITF) until Wed Mar 02 2022   
* SQ42 Character Art (S42CA) until Thu Feb 10 2022   
  
**Enemy Ships** [SQ42]  
* VFX Team (VFX) until Sun Feb 20 2022   
  
**Entity Stow/Destroy** [SC]  
* Network Team (NET) until Mon Feb 14 2022   
* Persistent Tech Team (PT) until Mon Feb 14 2022   
  
**Error Reporting & Crash Handling** [SC]  
* Live Tools Team (LIT) until Tue Mar 29 2022   
  
**EVA T2** [SC, SQ42]  
* Actor Feature Team (AFT) until Thu Mar 31 2022 {PT}  
  
**Female Player Head** [SQ42]  
* Tech Animation Team (TAN) until Mon Feb 14 2022   
  
**Fire Hazard** [SC, SQ42]  
* VFX Team (VFX) until Sun Mar 13 2022 {PT}  
* Graphics Team (GFX) until Mon Mar 07 2022 {PT}  
  
**FPS Radar / Scanning** [SC, SQ42]  
* Actor Feature Team (AFT) until Thu Mar 31 2022 {PT}  
  
**Frontier Clothing** [SC]  
* Narrative (NARR) until Thu Feb 17 2022   
* SC Character Art (SCCA) until Thu Feb 10 2022   
  
**Gen12 - Renderer T1** [SC, SQ42]  
* Engine Team (ENG) until Mon Feb 28 2022   
* Graphics Team (GFX) until Mon Mar 07 2022   
  
**Greycat Industrial Cydnus Mining Droid** [SQ42]  
* SQ42 Art (S42A) until Mon Mar 28 2022   
  
**Greycat Industrial Salvage Backpack** [SC]  
* Narrative (NARR) until Thu Feb 17 2022   
  
**Greycat Industrial Salvage Tool** [SC, SQ42]  
* Weapon Content Team (WCT) until Thu Feb 10 2022   
  
**Greycat PTV Gold Standard** [SC]  
* Vehicle Concept Art (VCA) until Thu Feb 10 2022   
  
**Hacking T0** [SC, SQ42]  
* EU Sandbox 1 (EUSB1) until Thu Apr 21 2022 {PT}  
* Weapon Feature Team (WFT) until Thu Mar 31 2022   
  
**HEX** [SC]  
* Live Tools Team (LIT) until Tue Mar 15 2022   
  
**Hospital Surgeon** [SC]  
* SC Character Art (SCCA) until Thu Feb 10 2022   
  
**Hybrid Service** [SC]  
* Network Team (NET) until Mon Feb 14 2022   
  
**Jump Points** [SC, SQ42]  
* Graphics Team (GFX) until Mon Mar 07 2022   
  
**Levski - Hospital Interior Location** [SC]  
* MTL Sandbox 1 (MTLSB) until Mon Feb 14 2022 {PT}  
  
**Login Flow** [SC]  
* Game Services Team (GSC) until Tue Mar 29 2022   
* Live Tools Team (LIT) until Tue Mar 29 2022   
  
**Long Distance Probing** [SC]  
* Systemic Services and Tools Team (SST) until Mon Feb 28 2022   
  
**Look IK Architecture Refactor** [SC, SQ42]  
* Tech Animation Team (TAN) until Mon Mar 28 2022   
  
**Loot Generation T1** [SC]  
* EU PU Gameplay Feature Team (EUPU) until Mon Feb 14 2022   
  
**Lorville - Hospital Interior Location** [SC]  
* Audio (AUDIO) until Thu Feb 10 2022   
* VFX Team (VFX) until Sun Feb 20 2022   
  
**MISC Hull A** [SC]  
* Vehicle Content - EU (EUVC) until Thu Feb 10 2022   
* Audio (AUDIO) until Thu Feb 10 2022   
* Vehicle Experience Team (VET) until Mon Feb 14 2022   
* VFX Team (VFX) until Sun Mar 13 2022 {PT}  
* Vehicle Content - US (USVC) until Thu Feb 17 2022   
* Vehicle Feature Team (VFT) until Mon Feb 14 2022   
  
**MISC Hull D** [SC]  
* Vehicle Concept Art (VCA) until Thu Feb 10 2022   
  
**Miscellaneous Support** [SC, SQ42]  
* AI Content Team (AIC) until Wed Mar 16 2022 {PT}  
* AI Tech and Feature Team (AITF) until Wed Mar 16 2022 {PT}  
* Props Team (PROPS) until Sat Feb 26 2022   
* SQ42 Art (S42A) until Mon Mar 28 2022   
* Actor Feature Team (AFT) until Thu Mar 31 2022   
* Vehicle Experience Team (VET) until Mon Feb 14 2022   
* Tools Team (DVT) until Mon Mar 28 2022   
* Tech Animation Team (TAN) until Mon Mar 28 2022   
* Vehicle Tech Team (VTT) until Thu Feb 17 2022   
* Actor Tech Team (ATT) until Thu Mar 31 2022 {PT}  
* Editor Team (EDIT) until Mon Mar 28 2022   
* Graphics Team (GFX) until Mon Mar 07 2022   
* Weapon Feature Team (WFT) until Thu Mar 31 2022   
* Gameplay Story (GPS) until Wed Mar 30 2022   
  
**Modular Shaders** [SC, SQ42]  
* Graphics Team (GFX) until Mon Mar 07 2022   
  
**Name Resolving API** [SC]  
* Persistent Tech Team (PT) until Mon Feb 28 2022   
  
**Nyx System, Planet, and Mission Setup** [SC]  
* EU Sandbox 1 (EUSB1) #0 until Thu Apr 07 2022 {PT}  
* EU Sandbox 1 (EUSB1) #1 until Thu Apr 21 2022 {PT}  
  
**Origin X1** [SC]  
* Vehicle Content - EU (EUVC) until Thu Feb 10 2022   
  
**Outpost Homestead - Independent & Outlaw** [SC]  
* Narrative (NARR) until Thu Feb 17 2022   
* Props Team (PROPS) until Sat Feb 19 2022   
* EU Sandbox 1 (EUSB1) until Mon Feb 14 2022 {PT}  
* Lighting Team (LIGHT) until Mon Mar 14 2022   
  
**Outpost Theme Variants** [SC]  
* EU Sandbox 1 (EUSB1) #0 until Mon Feb 14 2022 {PT}  
* EU Sandbox 1 (EUSB1) #1 until Thu Apr 07 2022 {PT}  
* EU Sandbox 1 (EUSB1) #2 until Thu Apr 21 2022 {PT}  
  
**Persistent Streaming and Server Meshing** [SC]  
* Game Services Team (GSC) until Tue Mar 29 2022   
* Actor Feature Team (AFT) until Thu Mar 31 2022   
* Vehicle Tech Team (VTT) until Thu Feb 17 2022 {PT}  
* Actor Tech Team (ATT) until Thu Mar 31 2022   
* Persistent Tech Team (PT) until Mon Mar 28 2022   
  
**Personal Inventory** [SC, SQ42]  
* Actor Feature Team (AFT) until Thu Mar 31 2022 {PT}  
  
**Probability Volume Encounter Density Refactor** [SC]  
* Systemic Services and Tools Team (SST) until Mon Feb 28 2022   
  
**Pyro Space Stations** [SC]  
* Props Team (PROPS) until Sat Feb 19 2022   
* EU Landing Zone Team (EULZ) #0 until Mon Feb 14 2022 {PT}  
* EU Landing Zone Team (EULZ) #1 until Thu Apr 07 2022 {PT}  
* EU Landing Zone Team (EULZ) #2 until Thu Apr 21 2022 {PT}  
* Lighting Team (LIGHT) until Mon Mar 14 2022   
  
**Pyro System, Planet, and Mission Setup** [SC]  
* Narrative (NARR) until Thu Feb 17 2022   
* EU Sandbox 1 (EUSB1) until Mon Feb 14 2022 {PT}  
  
**Quantum Simulation** [SC]  
* Systemic Services and Tools Team (SST) until Thu Apr 07 2022   
  
**Quantum Travel Experience** [SC]  
* Vehicle Experience Team (VET) until Mon Mar 14 2022   
  
**RaStar** [SC]  
* Planet Tech Team (PTT) until Tue Apr 26 2022   
  
**Replication Layer Entity Authority** [SC]  
* Network Team (NET) until Mon Feb 28 2022   
  
**Reputation V2** [SC, SQ42]  
* US PU Gameplay Feature Team (USPU) until Mon Feb 14 2022 {PT}  
  
**Resource Management** [SC]  
* EU PU Gameplay Feature Team (EUPU) until Mon Feb 28 2022 {PT}  
  
**Roads** [SC]  
* Planet Tech Team (PTT) until Mon Mar 14 2022   
  
**RSI Scorpius** [SC]  
* Vehicle Content - EU (EUVC) until Thu Feb 10 2022   
* Vehicle Experience Team (VET) until Mon Mar 14 2022   
  
**Salvage T0** [SC, SQ42]  
* Vehicle Content - EU (EUVC) until Thu Feb 10 2022   
* VFX Team (VFX) until Sun Apr 03 2022 {PT}  
* Graphics Team (GFX) until Mon Mar 07 2022 {PT}  
* Weapon Feature Team (WFT) until Thu Feb 17 2022   
  
**Server Streaming** [SC]  
* Network Team (NET) until Mon Feb 14 2022   
  
**Services Distributed Load Testing System** [SC]  
* Live Tools Team (LIT) until Tue Mar 29 2022   
  
**Ship CPU** [SC, SQ42]  
* Vehicle Experience Team (VET) until Mon Mar 14 2022   
  
**Ship to Ship Refueling** [SC]  
* EU PU Gameplay Feature Team (EUPU) until Mon Feb 14 2022   
  
**Shops and Patrons** [SC]  
* AI Content Team (AIC) until Wed Feb 16 2022   
* Props Team (PROPS) until Sat Feb 12 2022   
  
**Spacescaping** [SQ42]  
* SQ42 Art (S42A) until Mon Mar 28 2022   
  
**Subsumption Editor Integration** [SC, SQ42]  
* AI Tech and Feature Team (AITF) until Wed Mar 16 2022   
  
**Theaters of War - Miscellaneous Support** [SC]  
* Firesprite Team (FS) #0 until Thu Feb 10 2022 {PT}  
* Firesprite Team (FS) #1 until Thu Apr 07 2022 {PT}  
* Firesprite Team (FS) #2 until Thu Apr 21 2022 {PT}  
  
**Unannounced** [SC]  
* Planet Content Team (PCT) #0 until Mon Feb 14 2022 {PT}  
* Planet Content Team (PCT) #1 until Thu Apr 07 2022 {PT}  
* Planet Content Team (PCT) #2 until Thu Apr 21 2022 {PT}  
  
**Unannounced** [SC]  
* Vehicle Content - EU (EUVC) until Thu Feb 10 2022   
* Vehicle Concept Art (VCA) until Thu Feb 10 2022   
  
**Unannounced** [SC]  
* Vehicle Content - EU (EUVC) until Thu Feb 10 2022 {PT}  
  
**Unannounced** [SC]  
* Vehicle Concept Art (VCA) until Thu Feb 10 2022   
  
**Unannounced** [SC]  
* Vehicle Content - EU (EUVC) until Thu Feb 10 2022 {PT}  
  
**Vending Machine Utilization T0** [SC, SQ42]  
* AI Content Team (AIC) until Wed Feb 16 2022   
  
**Virtual AI Service** [SC]  
* Systemic Services and Tools Team (SST) until Mon Feb 28 2022   
  
**VisArea Improvements** [SC, SQ42]  
* Engine Team (ENG) until Mon Feb 28 2022 {PT}  
  
**Weapon Handling T2** [SC, SQ42]  
* Actor Tech Team (ATT) until Thu Feb 17 2022 {PT}  
  
**XenoThreat Armor** [SC]  
* SC Character Art (SCCA) until Thu Feb 10 2022   
  
**Zero G Push & Pull** [SC, SQ42]  
* Actor Feature Team (AFT) until Thu Mar 31 2022 {PT}  
