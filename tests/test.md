{% for post in site.categories['Delta'] %}
  <li>
    <a href="{{ post.url }}" target="_blank">{{ post.title }}</a>
  </li>
{% endfor %}