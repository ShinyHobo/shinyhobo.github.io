---
layout: default
---

<h1>ShinyTracker: A Star Citizen Analytics Reporting Tool</h1>
<p>Hi all; since CIG would like us to utilize the <a href="https://robertsspaceindustries.com/roadmap/progress-tracker/deliverables" target="_blank">progress tracker</a> more and the release roadmap less, I thought I'd help out by making the numerous (and unspoken) changes to the progress tracker more visible by writing a <a href="https://github.com/ShinyHobo/ec-bot" target="_blank">bot</a>. The outputs of said bot are listed below. These are still a work in progress, so stay tuned!</p>
<sup><a href="/data">(Data)</a></sup>
<p>There are currently two reports being run biweekly. For those interested, I have included an Extra Analysis section laying out some more detailed information at the beginning of each report.</p>
<div class="posts-list">
  <div id="deltas" class="posts">
    <h3>Progress Tracker Delta Report</h3>
    <p class="index-post-desc">Analyzes and lists changes from the previous iteration of the Progress Tracker</p>
    <ul>
      {% for post in site.categories['Delta'] %}
        <li>
          <a href="{{ post.url }}" target="_blank">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </div>
  <div id="teams" class="posts">
    <h3>Scheduled Deliverables Report</h3>
    <p class="index-post-desc">Looks at the currently (and soon to be) scheduled deliverables and the work associated with them.</p> 
    <ul>
      {% for post in site.categories['Teams'] %}
        <li>
          <a href="{{ post.url }}" target="_blank">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>