<h2>Hi all; since CIG would like us to utilize the <a href="https://robertsspaceindustries.com/roadmap/progress-tracker/deliverables" target="_blank">progress tracker</a> more and the release roadmap less, I thought I'd help out by making the numerous (and unspoken) changes to the progress tracker more visible by writing a <a href="https://github.com/ShinyHobo/ec-bot" target="_blank">bot</a>. The output(s) of said bot are listed below. These are still a work in progress, so stay tuned!</h2>
<sup><a href="/data">(Data)</a></sup>
<h3>There are currently two reports being run biweekly. The Scheduled Deliverables report looks at the currently (and soon to be) scheduled deliverables and the work associated with them. The PT Delta report analyzes and lists changes from the previous iteration of the Progress Tracker. For those interested, I have included an Extra Analysis section laying out some more detailed information at the beginning of each report.</h3>
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}" target="_blank">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
