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

## This section lists all currently scheduled deliverable time allocations. Any given item is assigned to either Star Citizen (SC), Squadron 42 (SQ42), or both, and the teams that work on each deliverable can be split between many tasks (marked with {PT} for part time). ##  
  
## There are currently 95 scheduled tasks being worked on by 41 teams: ##  
  
### **AI - Arcade Machine** [SC, SQ42] ###  
<details><summary>AI Content Team <ul><li> until Wed Mar 16 2022 {PT}</li></ul> 
</summary><p>..........~~~|~~~~~~~~~~................................................................................</p></details>  
  
### **AI - Landing Improvements** [SC] ###  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Feb 16 2022 </li></ul> 
</summary><p>..===========|==........................................................................................</p></details>  
  
### **AI - Navigation Links - Ladders/Ledge Grab** [SC, SQ42] ###  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Feb 16 2022 </li></ul> 
</summary><p>......=======|==........................................................................................</p></details>  
  
### **AI - Untrained Combat** [SC, SQ42] ###  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Mar 16 2022 </li></ul> 
</summary><p>..........===|==========................................................................................</p></details>  
  
### **AI - Usable System V2** [SC] ###  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Mar 02 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~....................................................................................</p></details>  
  
### **Archon** [SQ42] ###  
<details><summary>SQ42 Art <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **Atlas** [SC] ###  
<details><summary>Network Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>......=======|======....................................................................................</p></details>  
  
### **Atmospheric Pressure Damage** [SC] ###  
<details><summary>EU PU Gameplay Feature Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>..........===|======....................................................................................</p></details>  
  
### **Banu Merchantman** [SC] ###  
<details><summary>Vehicle Content - EU <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|==........................................................................................<br>.............|..~~......................................................................................<br>.............|....==....................................................................................<br>.............|......==..................................................................................<br>.............|........==................................................................................<br>.............|..........~~..............................................................................<br>.............|............==............................................................................<br>.............|..............==..........................................................................<br>.............|................==........................................................................<br>.............|..................~~......................................................................<br>.............|....................==....................................................................<br>.............|......................==..................................................................<br>.............|........................==................................................................<br>.............|..........................==..............................................................<br>.............|............................~~............................................................<br>.............|..............................==..........................................................<br>.............|................................~~........................................................<br>.............|..................................~~......................................................</p></details>  
<details><summary>Vehicle Concept Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................</p></details>  
  
### **Bounty Hunter V2** [SC] ###  
<details><summary>US PU Gameplay Feature Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>......=======|==........................................................................................<br>.............|....======................................................................................<br>.............|............~~~~..........................................................................<br>.............|................====......................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|........................................====..............................................<br>.............|............................................====..........................................<br>.............|................................................====......................................<br>.............|....................................................====..................................</p></details>  
  
### **Breakers Yard** [SQ42] ###  
<details><summary>SQ42 Art <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **Bug Fixing & Tech Debt** [SC, SQ42] ###  
<details><summary>Character Tech Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..====.......|..........................................................................................<br>......====...|..........................................................................................<br>..........===|..........................................................................................</p></details>  
<details><summary>Tools Team <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Network Team <ul><li> until Mon Mar 14 2022 </li></ul> 
</summary><p>..===========|==========................................................................................</p></details>  
<details><summary>Weapon Content Team <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|....==....................................................................................</p></details>  
<details><summary>Vehicle Tech Team <ul><li> until Thu Feb 17 2022 {PT}</li></ul> 
</summary><p>..==.........|..........................................................................................<br>....====.....|..........................................................................................<br>........~~~~.|..........................................................................................<br>............~|~~........................................................................................<br>.............|..====....................................................................................<br>.............|......~~~~................................................................................</p></details>  
<details><summary>Actor Tech Team <ul><li> until Thu Mar 31 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Editor Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..........===|==........................................................................................<br>.............|........======............................................................................</p></details>  
<details><summary>Engine Team <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Vehicle Feature Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>..===========|======....................................................................................<br>.............|............======........................................................................<br>.............|........................................======............................................</p></details>  
  
### **Building Interiors** [SC] ###  
<details><summary>MTL Sandbox 1 <ul><li> #1 until Thu Apr 07 2022 {PT}</li><li> #2 until Thu Apr 21
2022 {PT}</li><li> #3 until Mon Mar 14 2022 {PT}</li></ul> 
</summary><p>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~..........................................................................<br>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~......................................................................<br>..~~~~~~~~~~~|~~~~~~~~~~................................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|........................................======............................................<br>.............|............................................==================............................</p></details>  
  
### **Cargo System Refactor** [SC] ###  
<details><summary>Props Team <ul><li> until Sat Feb 19 2022 </li></ul> 
</summary><p>..........===|====......................................................................................</p></details>  
<details><summary>US PU Gameplay Feature Team <ul><li> until Mon Mar 28 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~~~~~~~............................................................................<br>.............|............~~~~..........................................................................<br>.............|................~~~~......................................................................<br>.............|....................~~~~..................................................................<br>.............|........................~~~~..............................................................<br>.............|............................~~~~..........................................................</p></details>  
  
### **Chapter 06** [SQ42] ###  
<details><summary>Gameplay Story <ul><li> until Sun Feb 13 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~........................................................................................<br>.............|........~~~~~~............................................................................</p></details>  
  
### **Chapter 08** [SQ42] ###  
<details><summary>Gameplay Story <ul><li> until Sun Feb 13 2022 {PT}</li></ul> 
</summary><p>..~~~~.......|..........................................................................................<br>..........~~~|~~........................................................................................<br>.............|........~~~~~~............................................................................</p></details>  
  
### **Chapter 10** [SQ42] ###  
<details><summary>Gameplay Story <ul><li> until Sun Feb 13 2022 {PT}</li></ul> 
</summary><p>......~~~~~~~|~~........................................................................................<br>.............|........~~~~~~............................................................................</p></details>  
  
### **Chapter 26** [SQ42] ###  
<details><summary>SQ42 Art <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **Character Work** [SQ42] ###  
<details><summary>AI Content Team <ul><li> until Wed Mar 16 2022 </li></ul> 
</summary><p>..===========|==========................................................................................</p></details>  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Mar 02 2022 </li></ul> 
</summary><p>..===========|======....................................................................................</p></details>  
<details><summary>Motion Capture Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>......=======|==........................................................................................<br>.............|........======............................................................................</p></details>  
<details><summary>Audio <ul><li> until Thu Feb 10 2022 {PT}</li></ul> 
</summary><p>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............~|..........................................................................................<br>.............|==........................................................................................<br>.............|..==......................................................................................<br>.............|....==....................................................................................</p></details>  
<details><summary>Character Tech Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>......====...|..........................................................................................<br>..........===|..........................................................................................<br>.............|====......................................................................................<br>.............|....====..................................................................................<br>.............|........====..............................................................................</p></details>  
<details><summary>SQ42 Character Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..====.......|..........................................................................................<br>......====...|..........................................................................................<br>..........===|..........................................................................................<br>.............|====......................................................................................<br>.............|....====..................................................................................<br>.............|........====..............................................................................</p></details>  
<details><summary>Tech Animation Team <ul><li> until Mon Mar 28 2022 {PT}</li></ul> 
</summary><p>..........~~~|~~~~~~~~~~~~~~............................................................................</p></details>  
  
### **Chemline** [SQ42] ###  
<details><summary>SQ42 Art <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>VFX Team <ul><li> until Sun Mar 13 2022 </li></ul> 
</summary><p>....=========|==========................................................................................</p></details>  
  
### **Civilian NPC Movement Improvements** [SC] ###  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Mar 02 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~....................................................................................</p></details>  
  
### **Commodity Kiosk** [SC] ###  
<details><summary>US PU Gameplay Feature Team <ul><li> until Mon Feb 28 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~....................................................................................<br>.............|............~~~~..........................................................................</p></details>  
  
### **Consolidated Outland HoverQuad** [SC] ###  
<details><summary>Vehicle Experience Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>......=======|==........................................................................................</p></details>  
  
### **Derelict Spaceships - Points of Interest** [SC] ###  
<details><summary>MTL Sandbox 1 <ul><li> #1 until Thu Apr 07 2022 {PT}</li><li> #2 until Thu Apr 21
2022 {PT}</li><li> #3 until Mon Mar 14 2022 {PT}</li></ul> 
</summary><p>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~..........................................................................<br>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~......................................................................<br>..~~~~~~~~~~~|~~~~~~~~~~................................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|........................................======............................................<br>.............|............................................==================............................</p></details>  
  
### **Drake Corsair** [SC] ###  
<details><summary>Vehicle Content - US <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>....====.....|..........................................................................................<br>........====.|..........................................................................................<br>............=|==........................................................................................<br>.............|..====....................................................................................<br>.............|......====................................................................................<br>.............|..............====........................................................................<br>.............|..................====....................................................................<br>.............|......................====................................................................<br>.............|..........................====............................................................<br>.............|..............................====........................................................<br>.............|..................................====....................................................</p></details>  
  
### **Drake Vulture** [SC] ###  
<details><summary>Vehicle Content - US <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>....====.....|..........................................................................................<br>........====.|..........................................................................................<br>............=|==........................................................................................</p></details>  
  
### **Dynamic Events** [SC] ###  
<details><summary>US PU Gameplay Feature Team <ul><li> until Mon Feb 28 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~....................................................................................<br>.............|............~~~~..........................................................................<br>.............|................~~~~......................................................................<br>.............|....................====..................................................................<br>.............|........................~~~~..............................................................<br>.............|............................~~~~..........................................................<br>.............|........................................====..............................................<br>.............|............................................====..........................................<br>.............|................................................====......................................<br>.............|....................................................====..................................</p></details>  
  
### **ECUS Improvements** [SC, SQ42] ###  
<details><summary>Engine Team <ul><li> until Mon Feb 28 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~....................................................................................</p></details>  
  
### **Enemy Characters** [SQ42] ###  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Mar 02 2022 </li></ul> 
</summary><p>..===========|======....................................................................................</p></details>  
<details><summary>SQ42 Character Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..====.......|..........................................................................................<br>......====...|..........................................................................................<br>..........===|..........................................................................................<br>.............|====......................................................................................<br>.............|....====..................................................................................<br>.............|........====..............................................................................</p></details>  
  
### **Enemy Ships** [SQ42] ###  
<details><summary>VFX Team <ul><li> until Sun Feb 20 2022 </li></ul> 
</summary><p>..........===|====......................................................................................</p></details>  
  
### **Entity Stow/Destroy** [SC] ###  
<details><summary>Network Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..===========|==........................................................................................</p></details>  
<details><summary>Persistent Tech Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..........===|==........................................................................................</p></details>  
  
### **Error Reporting & Crash Handling** [SC] ###  
<details><summary>Live Tools Team <ul><li> until Tue Mar 29 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **EVA T2** [SC, SQ42] ###  
<details><summary>Actor Feature Team <ul><li> until Thu Mar 31 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~~~~~~~............................................................................<br>.............|..............~~~~........................................................................<br>.............|..................~~~~....................................................................<br>.............|......................====................................................................<br>.............|..........................~~~~............................................................<br>.............|..............................~~~~........................................................<br>.............|..................................========................................................</p></details>  
  
### **Female Player Head** [SQ42] ###  
<details><summary>Tech Animation Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..........===|==........................................................................................</p></details>  
  
### **Fire Hazard** [SC, SQ42] ###  
<details><summary>VFX Team <ul><li> until Sun Mar 13 2022 {PT}</li></ul> 
</summary><p>....~~~~~~~~~|~~~~~~~~~~................................................................................</p></details>  
<details><summary>Graphics Team <ul><li> until Mon Mar 07 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~..................................................................................</p></details>  
  
### **FPS Radar / Scanning** [SC, SQ42] ###  
<details><summary>Actor Feature Team <ul><li> until Thu Mar 31 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~~~~~~~............................................................................</p></details>  
  
### **Frontier Clothing** [SC] ###  
<details><summary>Narrative <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>............=|==........................................................................................</p></details>  
<details><summary>SC Character Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..====.......|..........................................................................................<br>......====...|..........................................................................................<br>..........===|..........................................................................................<br>.............|====......................................................................................<br>.............|....====..................................................................................<br>.............|........====..............................................................................</p></details>  
  
### **Gen12 - Renderer T1** [SC, SQ42] ###  
<details><summary>Engine Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>..===========|======....................................................................................</p></details>  
<details><summary>Graphics Team <ul><li> until Mon Mar 07 2022 </li></ul> 
</summary><p>..===========|========..................................................................................</p></details>  
  
### **Greycat Industrial Cydnus Mining Droid** [SQ42] ###  
<details><summary>SQ42 Art <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **Greycat Industrial Salvage Backpack** [SC] ###  
<details><summary>Narrative <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>............=|==........................................................................................</p></details>  
  
### **Greycat Industrial Salvage Tool** [SC, SQ42] ###  
<details><summary>Weapon Content Team <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>............=|..........................................................................................<br>.............|....==....................................................................................</p></details>  
  
### **Greycat PTV Gold Standard** [SC] ###  
<details><summary>Vehicle Concept Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|==........................................................................................</p></details>  
  
### **Hacking T0** [SC, SQ42] ###  
<details><summary>EU Sandbox 1 <ul><li> until Thu Apr 21 2022 {PT}</li></ul> 
</summary><p>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~......................................................................</p></details>  
<details><summary>Weapon Feature Team <ul><li> until Thu Mar 31 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **HEX** [SC] ###  
<details><summary>Live Tools Team <ul><li> until Tue Mar 15 2022 </li></ul> 
</summary><p>..===========|==========................................................................................<br>.............|............~~~~..........................................................................<br>.............|................====......................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|................................========..................................................<br>.............|........................................======............................................<br>.............|............................................======================........................</p></details>  
  
### **Hospital Surgeon** [SC] ###  
<details><summary>SC Character Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..====.......|..........................................................................................<br>......====...|..........................................................................................<br>..........===|..........................................................................................</p></details>  
  
### **Hybrid Service** [SC] ###  
<details><summary>Network Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..........===|==........................................................................................</p></details>  
  
### **Jump Points** [SC, SQ42] ###  
<details><summary>Graphics Team <ul><li> until Mon Mar 07 2022 </li></ul> 
</summary><p>........=====|========..................................................................................</p></details>  
  
### **Levski - Hospital Interior Location** [SC] ###  
<details><summary>MTL Sandbox 1 <ul><li> until Mon Feb 14 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~........................................................................................</p></details>  
  
### **Login Flow** [SC] ###  
<details><summary>Game Services Team <ul><li> until Tue Mar 29 2022 </li></ul> 
</summary><p>..===========|==============............................................................................<br>.............|............~~~~..........................................................................<br>.............|................====......................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|................................========..................................................</p></details>  
<details><summary>Live Tools Team <ul><li> until Tue Mar 29 2022 </li></ul> 
</summary><p>......=======|==============............................................................................<br>.............|............~~~~..........................................................................<br>.............|................====......................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|................................========..................................................</p></details>  
  
### **Long Distance Probing** [SC] ###  
<details><summary>Systemic Services and Tools Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>..........===|======....................................................................................</p></details>  
  
### **Look IK Architecture Refactor** [SC, SQ42] ###  
<details><summary>Tech Animation Team <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..........===|==============............................................................................</p></details>  
  
### **Loot Generation T1** [SC] ###  
<details><summary>EU PU Gameplay Feature Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..===========|==........................................................................................<br>.............|............==================............................................................<br>.............|................................======....................................................<br>.............|........................................======............................................<br>.............|............................................==============................................<br>.............|............................................................======........................</p></details>  
  
### **Lorville - Hospital Interior Location** [SC] ###  
<details><summary>Audio <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........~~.|..........................................................................................<br>............=|..........................................................................................<br>.............|==........................................................................................<br>.............|..~~......................................................................................<br>.............|....==....................................................................................<br>.............|......==..................................................................................</p></details>  
<details><summary>VFX Team <ul><li> until Sun Feb 20 2022 </li></ul> 
</summary><p>....=========|====......................................................................................</p></details>  
  
### **MISC Hull A** [SC] ###  
<details><summary>Vehicle Content - EU <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|==........................................................................................<br>.............|..==......................................................................................</p></details>  
<details><summary>Audio <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|==........................................................................................<br>.............|..==......................................................................................<br>.............|....==....................................................................................</p></details>  
<details><summary>Vehicle Experience Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>......=======|==........................................................................................</p></details>  
<details><summary>VFX Team <ul><li> until Sun Mar 13 2022 {PT}</li></ul> 
</summary><p>..........~~~|~~~~~~~~~~................................................................................</p></details>  
<details><summary>Vehicle Content - US <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>............=|==........................................................................................<br>.............|......====................................................................................</p></details>  
<details><summary>Vehicle Feature Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..===========|==........................................................................................</p></details>  
  
### **MISC Hull D** [SC] ###  
<details><summary>Vehicle Concept Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>............=|..........................................................................................<br>.............|==........................................................................................</p></details>  
  
### **Miscellaneous Support** [SC, SQ42] ###  
<details><summary>AI Content Team <ul><li> until Wed Mar 16 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~~~................................................................................</p></details>  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Mar 16 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~~~................................................................................</p></details>  
<details><summary>Props Team <ul><li> until Sat Feb 26 2022 </li></ul> 
</summary><p>..======.....|..........................................................................................<br>........=====|======....................................................................................<br>.............|........======............................................................................</p></details>  
<details><summary>SQ42 Art <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Actor Feature Team <ul><li> until Thu Mar 31 2022 </li></ul> 
</summary><p>..===========|==============............................................................................<br>.............|..............====........................................................................<br>.............|..................~~~~....................................................................<br>.............|......................~~~~................................................................<br>.............|..........................====............................................................<br>.............|..............................====........................................................<br>.............|..................................~~~~~~~~................................................<br>.............|........................................~~~~~~............................................<br>.............|............................................======================........................</p></details>  
<details><summary>Vehicle Experience Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>......=======|==........................................................................................<br>.............|................======================....................................................<br>.............|............................................======================........................</p></details>  
<details><summary>Tools Team <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Tech Animation Team <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Vehicle Tech Team <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>....====.....|..........................................................................................<br>........====.|..........................................................................................<br>............=|==........................................................................................<br>.............|..====....................................................................................<br>.............|......====................................................................................<br>.............|..........====............................................................................</p></details>  
<details><summary>Actor Tech Team <ul><li> until Thu Mar 31 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~~~~~~~............................................................................</p></details>  
<details><summary>Editor Team <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Graphics Team <ul><li> until Mon Mar 07 2022 </li></ul> 
</summary><p>..===========|========..................................................................................</p></details>  
<details><summary>Weapon Feature Team <ul><li> until Thu Mar 31 2022 </li></ul> 
</summary><p>..===========|==============............................................................................<br>.............|..............====........................................................................<br>.............|..................====....................................................................<br>.............|......................====................................................................<br>.............|..........................====............................................................<br>.............|..............................====........................................................<br>.............|..................................~~~~~~~~................................................<br>.............|........................................~~~~~~............................................<br>.............|............................................======================........................</p></details>  
<details><summary>Gameplay Story <ul><li> until Wed Mar 30 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **Modular Shaders** [SC, SQ42] ###  
<details><summary>Graphics Team <ul><li> until Mon Mar 07 2022 </li></ul> 
</summary><p>..===========|========..................................................................................</p></details>  
  
### **Name Resolving API** [SC] ###  
<details><summary>Persistent Tech Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>..........===|======....................................................................................</p></details>  
  
### **Nyx System, Planet, and Mission Setup** [SC] ###  
<details><summary>EU Sandbox 1 <ul><li> #1 until Thu Apr 07 2022 {PT}</li><li> #2 until Thu Apr 21
2022 {PT}</li></ul> 
</summary><p>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~..........................................................................<br>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~......................................................................<br>.............|........~~~~~~............................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|................................========..................................................</p></details>  
  
### **Origin X1** [SC] ###  
<details><summary>Vehicle Content - EU <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|~~........................................................................................<br>.............|..==......................................................................................<br>.............|....~~....................................................................................<br>.............|......==..................................................................................<br>.............|........~~................................................................................<br>.............|..........~~..............................................................................<br>.............|..............==..........................................................................<br>.............|................==........................................................................<br>.............|..................==......................................................................<br>.............|....................~~....................................................................<br>.............|......................~~..................................................................<br>.............|........................==................................................................<br>.............|..........................~~..............................................................<br>.............|............................~~............................................................<br>.............|..............................~~..........................................................<br>.............|................................~~........................................................<br>.............|..................................~~......................................................<br>.............|....................................==....................................................<br>.............|........................................==................................................</p></details>  
  
### **Outpost Homestead - Independent & Outlaw** [SC] ###  
<details><summary>Narrative <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>............=|==........................................................................................</p></details>  
<details><summary>Props Team <ul><li> until Sat Feb 19 2022 </li></ul> 
</summary><p>..======.....|..........................................................................................<br>........=====|====......................................................................................<br>.............|........======............................................................................</p></details>  
<details><summary>EU Sandbox 1 <ul><li> until Mon Feb 14 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~........................................................................................<br>.............|........~~~~~~............................................................................</p></details>  
<details><summary>Lighting Team <ul><li> until Mon Mar 14 2022 </li></ul> 
</summary><p>......=======|==========................................................................................</p></details>  
  
### **Outpost Theme Variants** [SC] ###  
<details><summary>EU Sandbox 1 <ul><li> #1 until Thu Apr 07 2022 {PT}</li><li> #2 until Thu Apr 21
2022 {PT}</li><li> #3 until Mon Feb 14 2022 {PT}</li></ul> 
</summary><p>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~..........................................................................<br>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~......................................................................<br>..........~~~|~~........................................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|................................========..................................................</p></details>  
  
### **Persistent Streaming and Server Meshing** [SC] ###  
<details><summary>Game Services Team <ul><li> until Tue Mar 29 2022 </li></ul> 
</summary><p>..===========|==============............................................................................<br>.............|............~~~~..........................................................................<br>.............|................====......................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|................................========..................................................<br>.............|........................................======............................................<br>.............|............................................======================........................</p></details>  
<details><summary>Actor Feature Team <ul><li> until Thu Mar 31 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Vehicle Tech Team <ul><li> until Thu Feb 17 2022 {PT}</li></ul> 
</summary><p>....====.....|..........................................................................................<br>........====.|..........................................................................................<br>............~|~~........................................................................................<br>.............|..~~~~....................................................................................<br>.............|......~~~~................................................................................</p></details>  
<details><summary>Actor Tech Team <ul><li> until Thu Mar 31 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
<details><summary>Persistent Tech Team <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................<br>.............|............~~~~..........................................................................<br>.............|................====......................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|................................========..................................................<br>.............|........................................======............................................<br>.............|............................................======================........................</p></details>  
  
### **Personal Inventory** [SC, SQ42] ###  
<details><summary>Actor Feature Team <ul><li> until Thu Mar 31 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~~~~~~~............................................................................</p></details>  
  
### **Probability Volume Encounter Density Refactor** [SC] ###  
<details><summary>Systemic Services and Tools Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>..===========|======....................................................................................<br>.............|............====..........................................................................<br>.............|................====......................................................................<br>.............|....................====..................................................................</p></details>  
  
### **Pyro Space Stations** [SC] ###  
<details><summary>Props Team <ul><li> until Sat Feb 19 2022 </li></ul> 
</summary><p>..===========|====......................................................................................<br>.............|........======............................................................................</p></details>  
<details><summary>EU Landing Zone Team <ul><li> #1 until Thu Apr 07 2022 {PT}</li><li> #2 until Thu
Apr 21 2022 {PT}</li><li> #3 until Mon Feb 14 2022 {PT}</li></ul> 
</summary><p>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~..........................................................................<br>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~......................................................................<br>..~~~~~~~~~~~|~~........................................................................................<br>.............|........~~~~~~............................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|................................========..................................................<br>.............|........................................======............................................<br>.............|............................................==============................................<br>.............|............................................................======........................</p></details>  
<details><summary>Lighting Team <ul><li> until Mon Mar 14 2022 </li></ul> 
</summary><p>......=======|==========................................................................................</p></details>  
  
### **Pyro System, Planet, and Mission Setup** [SC] ###  
<details><summary>Narrative <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>........====.|..........................................................................................<br>............=|==........................................................................................</p></details>  
<details><summary>EU Sandbox 1 <ul><li> until Mon Feb 14 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~........................................................................................</p></details>  
  
### **Quantum Simulation** [SC] ###  
<details><summary>Systemic Services and Tools Team <ul><li> until Thu Apr 07 2022 </li></ul> 
</summary><p>..===========|================..........................................................................<br>.............|................====......................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|................................====......................................................<br>.............|........................................======............................................<br>.............|............................................======================........................</p></details>  
  
### **Quantum Travel Experience** [SC] ###  
<details><summary>Vehicle Experience Team <ul><li> until Mon Mar 14 2022 </li></ul> 
</summary><p>..======.....|..........................................................................................<br>..........===|==========................................................................................</p></details>  
  
### **RaStar** [SC] ###  
<details><summary>Planet Tech Team <ul><li> until Tue Apr 26 2022 </li></ul> 
</summary><p>..===========|======================....................................................................<br>.............|........................==========........................................................<br>.............|........................................==========........................................<br>.............|....................................................==========............................</p></details>  
  
### **Replication Layer Entity Authority** [SC] ###  
<details><summary>Network Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>..===========|======....................................................................................</p></details>  
  
### **Reputation V2** [SC, SQ42] ###  
<details><summary>US PU Gameplay Feature Team <ul><li> until Mon Feb 14 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~........................................................................................</p></details>  
  
### **Resource Management** [SC] ###  
<details><summary>EU PU Gameplay Feature Team <ul><li> until Mon Feb 28 2022 {PT}</li></ul> 
</summary><p>..........~~~|~~~~~~....................................................................................<br>.............|........======================............................................................<br>.............|................................======....................................................<br>.............|........................................======............................................<br>.............|............................................==============................................<br>.............|............................................................======........................</p></details>  
  
### **Roads** [SC] ###  
<details><summary>Planet Tech Team <ul><li> until Mon Mar 14 2022 </li></ul> 
</summary><p>......=======|==========................................................................................<br>.............|............======........................................................................</p></details>  
  
### **RSI Scorpius** [SC] ###  
<details><summary>Vehicle Content - EU <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|==........................................................................................<br>.............|..==......................................................................................<br>.............|....==....................................................................................<br>.............|......==..................................................................................<br>.............|........==................................................................................<br>.............|..........==..............................................................................<br>.............|............==............................................................................<br>.............|..............==..........................................................................<br>.............|................==........................................................................<br>.............|..................==......................................................................<br>.............|....................==....................................................................</p></details>  
<details><summary>Vehicle Experience Team <ul><li> until Mon Mar 14 2022 </li></ul> 
</summary><p>......=======|==========................................................................................</p></details>  
  
### **Salvage T0** [SC, SQ42] ###  
<details><summary>Vehicle Content - EU <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................</p></details>  
<details><summary>VFX Team <ul><li> until Sun Apr 03 2022 {PT}</li></ul> 
</summary><p>....~~~~~~~~~|~~~~~~~~~~~~~~~~..........................................................................</p></details>  
<details><summary>Graphics Team <ul><li> until Mon Mar 07 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~..................................................................................</p></details>  
<details><summary>Weapon Feature Team <ul><li> until Thu Feb 17 2022 </li></ul> 
</summary><p>..===========|==........................................................................................</p></details>  
  
### **Server Streaming** [SC] ###  
<details><summary>Network Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..===========|==........................................................................................</p></details>  
  
### **Services Distributed Load Testing System** [SC] ###  
<details><summary>Live Tools Team <ul><li> until Tue Mar 29 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **Ship CPU** [SC, SQ42] ###  
<details><summary>Vehicle Experience Team <ul><li> until Mon Mar 14 2022 </li></ul> 
</summary><p>......=======|==========................................................................................<br>.............|................======================....................................................<br>.............|............................................======================........................</p></details>  
  
### **Ship to Ship Refueling** [SC] ###  
<details><summary>EU PU Gameplay Feature Team <ul><li> until Mon Feb 14 2022 </li></ul> 
</summary><p>..===========|==........................................................................................</p></details>  
  
### **Shops and Patrons** [SC] ###  
<details><summary>AI Content Team <ul><li> until Wed Feb 16 2022 </li></ul> 
</summary><p>..===========|==........................................................................................</p></details>  
<details><summary>Props Team <ul><li> until Sat Feb 12 2022 </li></ul> 
</summary><p>..........===|==........................................................................................</p></details>  
  
### **Spacescaping** [SQ42] ###  
<details><summary>SQ42 Art <ul><li> until Mon Mar 28 2022 </li></ul> 
</summary><p>..===========|==============............................................................................</p></details>  
  
### **Subsumption Editor Integration** [SC, SQ42] ###  
<details><summary>AI Tech and Feature Team <ul><li> until Wed Mar 16 2022 </li></ul> 
</summary><p>..===========|==========................................................................................</p></details>  
  
### **Theaters of War - Miscellaneous Support** [SC] ###  
<details><summary>Firesprite Team <ul><li> #1 until Thu Apr 07 2022 {PT}</li><li> #2 until Thu Apr
21 2022 {PT}</li><li> #3 until Thu Feb 10 2022 {PT}</li></ul> 
</summary><p>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~..........................................................................<br>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~......................................................................<br>..~~~~.......|..........................................................................................<br>......~~~~...|..........................................................................................<br>..........~~~|..........................................................................................<br>.............|~~~~......................................................................................<br>.............|....~~~~..................................................................................<br>.............|........~~~~~~............................................................................<br>.............|....................====..................................................................<br>.............|........................====..............................................................<br>.............|............................====..........................................................<br>.............|................................========..................................................</p></details>  
  
### **Unannounced** [SC] ###  
<details><summary>Planet Content Team <ul><li> #1 until Thu Apr 07 2022 {PT}</li><li> #2 until Thu
Apr 21 2022 {PT}</li><li> #3 until Mon Feb 14 2022 {PT}</li></ul> 
</summary><p>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~..........................................................................<br>~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~......................................................................<br>..~~~~~~~~~~~|~~........................................................................................<br>.............|....................====..................................................................<br>.............|................................========..................................................</p></details>  
  
### **Unannounced** [SC] ###  
<details><summary>Vehicle Content - EU <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|==........................................................................................<br>.............|..==......................................................................................<br>.............|....==....................................................................................<br>.............|......==..................................................................................<br>.............|........==................................................................................<br>.............|..........==..............................................................................<br>.............|............==............................................................................<br>.............|..............==..........................................................................<br>.............|................==........................................................................<br>.............|..................==......................................................................<br>.............|....................==....................................................................<br>.............|......................==..................................................................<br>.............|........................==................................................................<br>.............|..........................==..............................................................<br>.............|............................==............................................................<br>.............|..............................==..........................................................</p></details>  
<details><summary>Vehicle Concept Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..==.........|..........................................................................................<br>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............=|..........................................................................................<br>.............|==........................................................................................</p></details>  
  
### **Unannounced** [SC] ###  
<details><summary>Vehicle Content - EU <ul><li> until Thu Feb 10 2022 {PT}</li></ul> 
</summary><p>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............~|..........................................................................................<br>.............|==........................................................................................<br>.............|..==......................................................................................<br>.............|....==....................................................................................<br>.............|......==..................................................................................<br>.............|........==................................................................................<br>.............|..........==..............................................................................<br>.............|............==............................................................................<br>.............|..............==..........................................................................<br>.............|................==........................................................................<br>.............|..................==......................................................................<br>.............|....................~~....................................................................<br>.............|......................~~..................................................................<br>.............|........................~~................................................................<br>.............|..........................~~..............................................................<br>.............|............................~~............................................................<br>.............|..............................~~..........................................................</p></details>  
  
### **Unannounced** [SC] ###  
<details><summary>Vehicle Concept Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>............=|..........................................................................................<br>.............|==........................................................................................<br>.............|..............==..........................................................................<br>.............|................==........................................................................<br>.............|..................==......................................................................<br>.............|....................==....................................................................<br>.............|......................==..................................................................<br>.............|........................==................................................................</p></details>  
  
### **Unannounced** [SC] ###  
<details><summary>Vehicle Content - EU <ul><li> until Thu Feb 10 2022 {PT}</li></ul> 
</summary><p>..==.........|..........................................................................................<br>....==.......|..........................................................................................<br>......==.....|..........................................................................................<br>........==...|..........................................................................................<br>..........==.|..........................................................................................<br>............~|..........................................................................................<br>.............|==........................................................................................<br>.............|..~~......................................................................................<br>.............|....~~....................................................................................<br>.............|......~~..................................................................................<br>.............|........==................................................................................<br>.............|..........==..............................................................................<br>.............|............==............................................................................<br>.............|..............~~..........................................................................<br>.............|................~~........................................................................<br>.............|..................~~......................................................................<br>.............|....................~~....................................................................<br>.............|......................~~..................................................................<br>.............|........................~~................................................................<br>.............|..........................~~..............................................................<br>.............|............................~~............................................................<br>.............|..............................~~..........................................................</p></details>  
  
### **Vending Machine Utilization T0** [SC, SQ42] ###  
<details><summary>AI Content Team <ul><li> until Wed Feb 16 2022 </li></ul> 
</summary><p>..===========|==........................................................................................</p></details>  
  
### **Virtual AI Service** [SC] ###  
<details><summary>Systemic Services and Tools Team <ul><li> until Mon Feb 28 2022 </li></ul> 
</summary><p>......=======|======....................................................................................<br>.............|........................................======............................................<br>.............|............................................==============................................</p></details>  
  
### **VisArea Improvements** [SC, SQ42] ###  
<details><summary>Engine Team <ul><li> until Mon Feb 28 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~....................................................................................</p></details>  
  
### **Weapon Handling T2** [SC, SQ42] ###  
<details><summary>Actor Tech Team <ul><li> until Thu Feb 17 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~........................................................................................</p></details>  
  
### **XenoThreat Armor** [SC] ###  
<details><summary>SC Character Art <ul><li> until Thu Feb 10 2022 </li></ul> 
</summary><p>..====.......|..........................................................................................<br>......====...|..........................................................................................<br>..........===|..........................................................................................<br>.............|====......................................................................................<br>.............|....====..................................................................................<br>.............|........====..............................................................................</p></details>  
  
### **Zero G Push & Pull** [SC, SQ42] ###  
<details><summary>Actor Feature Team <ul><li> until Thu Mar 31 2022 {PT}</li></ul> 
</summary><p>..~~~~~~~~~~~|~~~~~~~~~~~~~~............................................................................<br>.............|..............~~~~........................................................................<br>.............|..................~~~~....................................................................<br>.............|......................~~~~................................................................<br>.............|..........................~~~~............................................................<br>.............|..............................~~~~........................................................<br>.............|..................................~~~~~~~~................................................</p></details>  
