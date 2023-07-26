---
layout: default
nav_order: 1
regenerate: true
---

<h1>ShinyTracker: A Star Citizen Analytics Reporting Tool</h1>
<p>Hi all; since CIG would like us to utilize the <a href="https://robertsspaceindustries.com/roadmap/progress-tracker/deliverables" target="_blank">progress tracker</a> more and the release roadmap less, I thought I'd help out by making the numerous (and unspoken) changes to the progress tracker more visible by writing a <a href="https://github.com/ShinyHobo/ec-bot" target="_blank">bot</a>. The outputs of said bot are listed below.</p>
<div style="border: 2px solid white; border-radius: 20px; padding: 1px 20px 10px 20px;">
  <p>I've been working on some new ways to explore the data:</p>
  <ul>
    <li><a href="{{ '/tests/database-browser/#/browser' | relative_url}}" target="_blank">Database Terminal</a> - a readonly, full-access SQLite terminal</li>
    <li><a href="{{ '/tests/database-browser/#/timeline' | relative_url}}" target="_blank">Scheduled Work Timeline</a> - an enhanced version of the official Progress Tracker</li>
  </ul>
  <div style="text-align: center;">
    <a href="{{ '/tests/database-browser/#/timeline' | relative_url}}" target="_blank"><img src="{{ site.url }}/assets/images/timeline.PNG" style="max-height: 160px; box-shadow: 0px 0px 8px #b5e853; border-radius: 10px;"/></a>
  </div>
</div>
<p>There are currently two reports being run biweekly. For those interested, I have included an Extra Analysis section laying out some more detailed information at the beginning of each report.</p>
<div class="posts-list">
  <h2 id="no-changes-disclaimer" style="color: darkturquoise; display: none;">No changes have been detected for the week of 2023-07-12. Check back next time!</h2>
  <div id="deltas" class="posts">
    <h3><a class="category-link" href="{{ '/categories/delta/' | relative_url }}" target="_blank">Progress Tracker Delta Report</a></h3>
    <p class="index-post-desc">Analyzes and lists changes from the previous iteration of the Progress Tracker</p>
    <ul>
      {% for post in site.categories['Delta'] limit:6 %}
        <li>
          <a href="{{ post.url | relative_url }}" target="_blank">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </div>
  <div id="teams" class="posts">
    <h3><a class="category-link" href="{{ '/categories/teams/' | relative_url }}" target="_blank">Scheduled Deliverables Report</a></h3>
    <p class="index-post-desc">Looks at the currently (and soon to be) scheduled deliverables and the work associated with them</p>
    <ul>
      {% for post in site.categories['Teams'] limit:6 %}
        <li>
          <a href="{{ post.url | relative_url }}" target="_blank">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>
