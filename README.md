# Hybrid HTML5 app showcase

[Ionic](http://ionicframework.com/) based hybrid HTML5 app prototype

## Demo

[webdashappdotio.github.io/Ionic-Showcase](http://quirktools.com/screenfly/#u=http%3A//webdashappdotio.github.io/Ionic-Showcase/www/index.html%23/&w=375&h=667&a=37)

## Build


```bash
bower install
```

## Github-Pages auto-publication based on `master` commits


[Create Github Page branch manually](https://help.github.com/articles/creating-project-pages-manually/),
then set up your `.git/config` file this way:

```
[remote "origin"]
	url = git@github.com:WebDashAppDotIo/Ionic-Showcase.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	push = +refs/heads/master:refs/heads/gh-pages
	push = +refs/heads/master:refs/heads/master
```

Then `git push` will keep `gh-pages` branch mirrored on `master`.

## Licence

[MIT](LICENSE)
