<h2>Hi all; since CIG would like us to utilize the <a href="https://robertsspaceindustries.com/roadmap/progress-tracker/deliverables" target="_blank">progress tracker</a> more and the release roadmap less, I thought I'd help out by making the numerous (and unspoken) changes to the progress tracker more visible by writing a bot. The output(s) of said bot are listed below:</h2>
<hr/>
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}" target="_blank">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
