<h2>Hi all; since CIG would like us to utilize the <a href="https://robertsspaceindustries.com/roadmap/progress-tracker/deliverables" target="_blank">progress tracker</a> more and the release roadmap less, I thought I'd help out by making the numerous (and unspoken) changes to the progress tracker more visible by writing a <a href="https://github.com/ShinyHobo/ec-bot" target="_blank">bot</a>. The output(s) of said bot are listed below. These are still a work in progress, so stay tuned!</h2>
<h2>I'm working out some bugs with the latest update, so the most recent reports have some inaccuracies and are missing crucial information.</h2>
<sup><a href="/data">(Data)</a></sup>
<hr/>
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}" target="_blank">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
